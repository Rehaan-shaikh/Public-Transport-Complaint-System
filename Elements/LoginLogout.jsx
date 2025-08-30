"use client"
// import { useAuth } from "@/context/AuthContext";

import React from 'react'
import Link from "next/link";
import { Button } from '@/components/ui/button';


const LoginLogout = () => {
    // const { user, logout } = useAuth();
    return (
        <>
            {/* {user ? (
                <Button variant="secondary" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <>
                    <Button variant="default" className="text-black">
                        <Link href="/login">Login</Link>

                    </Button>
                    <Button variant="secondary">
                        <Link href="/register"> Register</Link>
                    </Button>
                </>
            )} */}

            <Button variant="default" className="text-black">
                        <Link href="/login">Login</Link>
            </Button>
        </>
    )
}

export default LoginLogout
