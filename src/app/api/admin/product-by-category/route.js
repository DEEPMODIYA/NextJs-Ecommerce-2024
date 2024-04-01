import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const getData = await Product.find({ category: id});
        
        if(getData) {
            return NextResponse.json({
                success: true,
                data: getData,
            });
        } else {
            return NextResponse.json({
                success : false,
                status : 204,
                meassage : "No product found"
            })
        } 
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            success : false,
            meassage : "Something were wrong ! please try again later",
        });
    }
}