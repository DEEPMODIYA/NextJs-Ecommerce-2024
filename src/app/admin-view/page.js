'use client'

import { GlobalContext } from "@/context"
import { getAllOrdersForAllUsers } from "@/services/order";
import { useContext, useEffect } from "react"


export default function AdminView() {

    const { user,allOrdersForAllUsers, setAllOrdersForAllUsers } = useContext(GlobalContext);

    async function extractAllOrdersForAllUsers() {
        const res = await getAllOrdersForAllUsers();

        console.log(res);
    }

    useEffect(() => {
        if (user !== null) extractAllOrdersForAllUsers();
    },[user])

    return (
        <div>Admin view</div>
    )
}