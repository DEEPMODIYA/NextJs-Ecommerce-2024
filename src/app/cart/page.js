"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
//import { toast } from "react-toastify";

export default function Cart(){
    const { user, setCartItems, cartItems, pageLevelLoader, setPageLevelLoader, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext);

    async function extractAllCartItems(){
        setPageLevelLoader(true);
        const res = await getAllCartItems(user?._id)
    
        if(res.success) {
            setPageLevelLoader(false);
            setCartItems(res.data);
            localStorage.setItem("cartItems",JSON.stringify(res.data));
        } 
    
        console.log(res);
    
    }

    useEffect(()=>{
        if(user !== null) extractAllCartItems()
    },[user])

    async function handleDeleteCartItem(getCartItemID) {  
        setComponentLevelLoader({ loading: true, id: getCartItemID });
        const res = await deleteFromCart(getCartItemID);
  
        if(res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
       
            toast.success(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            extractAllCartItems();
        } else {
          
            setComponentLevelLoader({ loading: false, id: getCartItemID });
            toast.error(res.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    if (pageLevelLoader) {
        return (
          <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
              color={"#000000"}
              loading={pageLevelLoader}
              size={30}
              data-testid="loader"
            />
          </div>
        );
      }
    

    return <CommonCart  
            componentLevelLoader={componentLevelLoader}
            handleDeleteCartItem={ handleDeleteCartItem } 
            cartItems={cartItems} />
}