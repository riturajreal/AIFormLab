"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const { theme, setTheme, systemTheme } = useTheme();

  // Get the correct theme after mount
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    !path.includes("aiform") && (
      <div className="p-5 border-b shadow-sm bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src={"/logo.svg"} width={200} height={40} alt="logo" />
          </Link>

          <div className="flex items-center gap-5">
            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            >
              {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Auth Buttons */}
            {isSignedIn ? (
              <>
                <Link href={"/dashboard"}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <SignInButton>
                <Button>Get Started</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
