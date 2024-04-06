import { prismadb } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req:Request) {

    const body =  await req.text();
    const signature = headers().get("Stripe-Signature") as string;


    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        
    } catch (error :any) {
        return new NextResponse(`webhoook error : ${error.message}`, {status:400})
        
    }


    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    if(event.type === "checkout.session.completed" ){

        if(!userId || !courseId){
            return new NextResponse("Webhook error missing userID or courseId")
        }

        await prismadb.purchase.create({
            data:{
                courseId:courseId,
                userId:userId
            }
        })
    }
    else{
        return new NextResponse(`webhoook error : ${event.type}`, {status:401})

    }

    return new NextResponse(null, {status:200})
    
}