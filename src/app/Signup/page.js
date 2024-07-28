"use client"

import Navbar from "../components/Navbar";
import logo from "../../../public/instagram-word-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";


export default function SignUp() {
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" })
  const notifyError = (msg) => toast.error(msg)
  const notifySuccess = (msg) => toast.success(msg)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?]).{8,}$/;
  const postData = () => {
    if (!emailRegex.test(formData.email)) {
      notifyError("Invalid Email")
      return
    } else if (!passwordRegex.test(formData.password)) {
      notifyError("Password must be strong")
      return
    }
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then(data => {
      if (data.error) {
        notifyError(data.error)
        return
      } else {
        notifySuccess(data.message)
        setFormData({ name: "", username: "", email: "", password: "" });
      }
    })
        redirect("/Signin");

  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-screen bg-gray-50">
        <form className="flex flex-col space-y-5 text-center items-center p-10 shadow-2xl bg-white" onSubmit={(e) => {
          e.preventDefault()
          postData()
        }}>
          <Image src={logo} width={160} />
          <p className="pointer-events-none">
            Sign Up to see photos and videos <br /> from your friends
          </p>
          <input
            type="text"
            name="name"
            placeholder="Type your Full Name here..."
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            className="border py-2 px-2 border-gray-600 w-[80%] rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Type your Username here..."
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            className="border py-2 px-2 border-gray-600 w-[80%] rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Type your email here..."
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            className="border py-2 px-2 border-gray-600 w-[80%] rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Type your Password here..."
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className="border py-1 px-2 border-gray-600 w-[80%] rounded"
          />
          <p className="pointer-events-none">
            By signing up you are agreeing to our Terms, <br /> Privacy Policy
            and Cookies Policy
          </p>
          <button
            className="shadow bg-black hover:bg-gray-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <p>
            <span className="pointer-events-none mr-2">
              Already have an account?
            </span>
            <Link
              href="/Signin"
              className="cursor-pointer underline text-blue-600"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
