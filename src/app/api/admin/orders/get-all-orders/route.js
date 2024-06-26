import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser?.role === "admin") 
        {
            const getAllOrders = await Order.find({})
                .populate('orderItems.product')
                .populate('user');
            
            if (getAllOrders)
            {
                return NextResponse.json({
                    success: true,
                    data: getAllOrders,
                });
            }
            else
            {
                return NextResponse.json({
                    success: false,
                    message: "Failed to fetch orders ! please try again later !"
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