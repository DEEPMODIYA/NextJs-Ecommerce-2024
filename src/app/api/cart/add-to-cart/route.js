import connectToDB from "@/database";
import AuthUser from "@/middeware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import Joi from "joi";

export async function POST(req) {
    try{
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if(isAuthUser){

            const data = await req.json();
            const {productID,  userID} = data;

            const {error} = addToCart.validate({userID, productID});

            if(error){
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                  });
            } 

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID : productID,
                userID : userID
            })

            if(isCurrentCartItemAlreadyExists) {
                return NextResponse.json({
                    success: false,
                    message: "product is already in the cart",
                  });
            }

            const saveProductToCart = await Cart.create(data);

            if(saveProductToCart){
                return NextResponse.json({
                    success: true,
                    message: "Product is added to cart!",
                  }); 
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to add the product to cart !",
                  });
            }

        }else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
              });
        }
        
    }catch(e){
        console.log(error);
        return NextResponse.json({
          success: false,
          message: "Something went wrong ! Please try again later",
        });
    }
};