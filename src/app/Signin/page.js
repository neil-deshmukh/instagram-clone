import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";
import logo from "../../../public/instagram-word-logo.png";


export default function SignIn() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-screen bg-gray-50">
        <form className="flex flex-col space-y-5 text-center items-center p-10 shadow-2xl bg-white">
          <Image src={logo} width={160} />
          <p className="pointer-events-none">
            Sign Up to see photos and videos <br /> from your friends
          </p>
          <input
            type="email"
            name="email"
            placeholder="Type your email here..."
            className="border py-2 px-2 border-gray-600 w-[80%] rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Type your Password here..."
            className="border py-1 px-2 border-gray-600 w-[80%] rounded"
          />
          <p className="pointer-events-none">
            By signing up you are agreeing to our Terms, <br /> Privacy Policy
            and Cookies Policy
          </p>
          <button
            className="shadow bg-black hover:bg-gray-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <p>
            <span className="pointer-events-none mr-2">
              Dont have an account?
            </span>
            <Link
              href="/Signup"
              className="cursor-pointer underline text-blue-600"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}