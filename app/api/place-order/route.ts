import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Optional: You could read the order details here if you want
    // const body = await req.json()
    
    // Simulate a small delay to feel realistic
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      orderId: `ORD-${Date.now()}`,
    })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    )
  }
}