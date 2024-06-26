import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        await connectToDB();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");

        if(!productId) {
            return NextResponse.json({
                success : false,
                status : 400,
                meassage : "product id is required",
            })
        }
        const getData = await Product.find({ _id : productId });
        
        if(getData && getData.length) {
            return NextResponse.json({
                success: true,
                data: getData[0],
            });
        } else {
            return NextResponse.json({
                success : false,
                status : 204,
                meassage : "No product found",
            })
        } 

    } catch(e){
        console.log(e);
        return NextResponse.json({
            success : false,
            meassage : "Something were wrong ! please try again later",
        });
    }
}