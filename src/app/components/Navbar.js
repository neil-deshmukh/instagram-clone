"use client"

import Image from "next/image";
import logo from "../../../public/instagram-word-logo.png"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../loginContext";


export default function Navbar() {
  const pathname = usePathname()
  const context = useContext(LoginContext)
  const [tokenExists, setTokenExists] = useState(false)
  let setIsModal = null;
  if (pathname == "/") {
    setIsModal = context.setIsModal
  }
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      setTokenExists(true)
    }
  }, [])
  return (
    <header className="flex justify-around shadow-md py-4 items-center">
      <Image src={logo} width={160} />
      <ul className="flex items-baseline">
        {!tokenExists && (
          <>
            <Link
              href="/Signup"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/Signup" }
              )}
            >
              Sign Up
            </Link>
            <Link
              href="/Signin"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/Signin" }
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
                { "font-extrabold text-xl": pathname == "/" }
              )}
            >
              Home
            </Link>
            <Link
              href="/Followingposts"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/Followingposts" }
              )}
            >
              Following Posts
            </Link>
            <Link
              href="/Profile"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/Profile" }
              )}
            >
              Profile
            </Link>
            <Link
              href="/Createpost"
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/Createpost" }
              )}
            >
              Create Post
            </Link>
            <Link
              href={""}
              className={clsx(
                "mx-[15px] cursor-pointer hover:font-semibold text-lg",
                { "font-extrabold text-xl": pathname == "/" }
              )}
            >
              <button
                className="cursor-pointer font-bold py-[9px] px-[25px] text-[0.8rem] border-none outline-none text-white bg-[#db183c] rounded-2xl hover:-translate-y-1 hover:shadow-2xl transition-all"
                onClick={() => (setIsModal ? setIsModal(true) : 1 + 1)}
              >
                Log Out
              </button>
            </Link>
          </>
        )}
      </ul>
    </header>
  );
}
