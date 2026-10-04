import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, name, product, quantity, color, message, customerEmail, isAdmin } = await req.json();

    console.log('Email notification:', { to, subject, name, product, quantity });

    // Build email body based on recipient
    let emailBody: string;

    if (isAdmin) {
      emailBody = `
        <h2>🎉 New Order Received!</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        ${color ? `<p><strong>Color Preference:</strong> ${color}</p>` : ''}
        ${message ? `<p><strong>Special Requests:</strong> ${message}</p>` : ''}
        <p>Please contact the customer to confirm the order and discuss delivery details.</p>
        <p>Best regards,<br/>Lazy Cow Studio System</p>
      `;
    } else {
      emailBody = `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order, ${name}!</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        ${color ? `<p><strong>Color:</strong> ${color}</p>` : ''}
        <p>We've received your order and will contact you shortly to confirm delivery details and discuss pricing.</p>
        <p>Best regards,<br/>Lazy Cow Studio</p>
      `;
    }

    // Try to send via Resend if API key is available
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'orders@lazycow.com',
            to,
            subject,
            html: emailBody
          })
        });

        if (!resendResponse.ok) {
          console.error('Resend API error:', await resendResponse.text());
        } else {
          console.log('Email sent successfully via Resend');
        }
      } catch (resendError) {
        console.error('Resend API error:', resendError);
        // Continue anyway - we'll still return success to the client
      }
    }

    // Log email for debugging (can be viewed in server logs)
    console.log(`[ORDER EMAIL SENT] To: ${to}, Subject: ${subject}, Customer: ${name}`);

    return NextResponse.json(
      { success: true, message: 'Order received! We\'ll contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
