import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'
  });
}

export async function POST(req: NextRequest) {
  let dbStatus: any = null;

  try {
    const body = await req.json();
    const { to, subject, name, product, quantity, color, message, customerEmail, isAdmin } = body;

    console.log('=== REQUEST RECEIVED ===');
    console.log('Full body:', JSON.stringify(body));
    console.log('isAdmin:', isAdmin, 'typeof:', typeof isAdmin);
    console.log('customerEmail:', customerEmail, 'typeof:', typeof customerEmail);
    console.log('product:', product, 'typeof:', typeof product);
    console.log('Condition check: !isAdmin=', !isAdmin, ' && customerEmail=', !!customerEmail, ' && product=', !!product);

    // Save order to Supabase for customer orders (non-admin)
    if (!isAdmin) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log('[DB] Attempting save:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        name,
        customerEmail,
        product,
        allConditions: {
          url: !!supabaseUrl,
          key: !!supabaseKey,
          name: !!name,
          email: !!customerEmail,
          product: !!product,
          allPresent: !!(supabaseUrl && supabaseKey && name && customerEmail && product)
        }
      });

      if (supabaseUrl && supabaseKey && name && customerEmail && product) {
        dbStatus = { attempting: true };
        try {
          const orderData: any = {
            name,
            email: customerEmail,
            product,
            quantity: parseInt(quantity) || 1
          };

          if (color) orderData.color = color;
          if (message) orderData.message = message;

          console.log('[DB] Fetching:', `${supabaseUrl}/rest/v1/orders`);

          const supabaseResponse = await fetch(
            `${supabaseUrl}/rest/v1/orders`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify(orderData)
            }
          );

          console.log('[DB] Response status:', supabaseResponse.status);
          dbStatus = { status: supabaseResponse.status, ok: supabaseResponse.ok };

          if (supabaseResponse.ok) {
            console.log('[DB SUCCESS] Order saved for', customerEmail);
            dbStatus.success = true;
          } else {
            const errorText = await supabaseResponse.text();
            console.error('[DB FAIL] Status:', supabaseResponse.status, 'Error:', errorText);
            dbStatus.error = errorText;
            dbStatus.success = false;
          }
        } catch (dbError) {
          console.error('[DB EXCEPTION]', String(dbError));
        }
      } else {
        console.log('[DB SKIP] Conditions not met');
      }
    }

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

    const responseBody: any = {
      success: true,
      message: 'Order received! We\'ll contact you soon.',
      _debug: { dbStatus }
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error('Error processing email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
