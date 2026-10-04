import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, name, product, quantity } = await req.json();

    // For now, just log the email (in production, use Resend or Sendgrid)
    console.log('Email notification:', { to, subject, name, product, quantity });

    // Simulated email sending
    const emailBody = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order, ${name}!</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p>We'll contact you shortly to confirm delivery details.</p>
      <p>Best regards,<br/>Lazy Cow Studio</p>
    `;

    // TODO: Integrate with Resend API in production
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'orders@lazycow.com',
    //     to,
    //     subject,
    //     html: emailBody
    //   })
    // });

    return NextResponse.json(
      { success: true, message: 'Email notification sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
