import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Call Supabase REST API from server side
    const response = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey || '',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit order' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Order submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Server error processing order' },
      { status: 500 }
    );
  }
}
