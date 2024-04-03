'use client'

import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { getAllCartItems } from "@/services/cart";
import { useEffect } from "react";

export default function CartModal() {

    const { showCartModal, setShowCartModal, user } = useContext(GlobalContext);

    async function extractAllCartItems(){
        const res = await getAllCartItems(user?._id)

        console.log(res);
    }

    useEffect(()=>{
        if(user !== null) extractAllCartItems()
    },[user])
    
    return (
        <CommonModal 
            showButtons={true}
            show={showCartModal}
            setShow={setShowCartModal}
            buttonComponent={
                <Fragment>
                    <button>Go To Cart</button>
                    <button>checkout</button>
                </Fragment>
            }
        />
    );
}