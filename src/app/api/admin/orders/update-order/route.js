import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req);
        const data = req.json();

        if(isAuthUser?.role === "admin") 
        {
            const updateOrder = await Order.findOneAndUpdate(
                    { _id : _id },
                    {
                        isPaid,
                        isProcessing,
                        orderItems,
                        paidAt,
                        paymentMethod,
                        shippingAddress,
                    },
                    { new:true } 
            );
            
            if (updateOrder)
            {
                return NextResponse.json({
                    success: true,
                    message: "order status update successfully",
                });
            }
            else
            {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update order status ! please try again later !"
                });
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not Authorized !"
            });
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! please try again later"
        });
    }
}