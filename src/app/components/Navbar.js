"use client"

import Image from "next/image";
import logo from "../../../public/instagram-word-logo.png"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Navbar() {
  return (
    <header className="flex justify-around shadow-md py-4 items-center">
      <Image src={logo} width={160} />
      <ul className="flex">
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
        <Link
          href="/Profile"
          className={clsx(
            "mx-[15px] cursor-pointer hover:font-semibold text-lg",
            { "font-extrabold text-xl": usePathname() == "/Profile" }
          )}
        >
          Profile
        </Link>
      </ul>
    </header>
  );
}
