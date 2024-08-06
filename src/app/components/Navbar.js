"use client"

import Image from "next/image";
import logo from "../../../public/instagram-word-logo.png"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [tokenExists, setTokenExists] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      setTokenExists(true)
    }
  }, [])
  return (
    <header className="flex justify-around shadow-md py-4 items-center">
      <Image src={logo} width={160} />
      <ul className="flex">
        {!tokenExists && (
          <>
            <Link
              href="/Signup"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": usePathname() == "/Signup" }
              )}
            >
              Sign Up
            </Link>
            <Link
              href="/Signin"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": usePathname() == "/Signin" }
              )}
            >
              Sign In
            </Link>
          </>
        )}
        {tokenExists && (
          <>
            <Link
              href="/"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": usePathname() == "/" }
              )}
            >
              Home
            </Link>
            <Link
              href="/Profile"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": usePathname() == "/Profile" }
              )}
            >
              Profile
            </Link>
            <Link
              href="/Createpost"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": usePathname() == "/Createpost" }
              )}
            >
              Create Post
            </Link>
          </>
        )}
      </ul>
    </header>
  );
}
