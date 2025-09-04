
import { getCurrentUser } from '@/Actions/User'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Authlayout = async({ children }) => {
    const user = await getCurrentUser();
    const ses =await auth();
    if(user || ses){
        redirect("/");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Authlayout

