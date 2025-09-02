
import { getCurrentUser } from '@/Actions/User'
import { redirect } from 'next/navigation';
import React from 'react'

const Authlayout = async({ children }) => {
    const user = await getCurrentUser();
    if(user){
        redirect("/");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Authlayout

