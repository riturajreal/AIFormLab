'use client'
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
const Header = () => {
    const { user, isSignedIn } = useUser();
    return <div className="p-5 border-b shadow-sm fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex justify-between items-center">
            <Image src="/logo.svg" alt="logo" width={180} height={50} />
            {isSignedIn ?
                <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> : <Link href="/sign-in">
                    <Button>Get Started</Button>
                </Link>}
        </div>
    </div>;
};

export default Header;
