"use client"

import Image from "next/image";
import Navbar from "../components/Navbar";

export default function CreatePost() {
    const loadFile = (event) => {
        let output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0])
        output.onload = function () {
            URL.revokeObjectURL(output.src)
        }
    }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center pt-20">
        <div className="flex flex-col border">
          <div className="flex space-x-5 justify-center items-center py-4">
            <h1 className="font-semibold text-lg">Create Post</h1>
            <button className="font-semibold border-none outline-none bg-none text-blue-600">
              Share
            </button>
          </div>
          <div className="border-y p-4 flex flex-col items-center justify-center">
            <img
              src="\placeholdy.png"
              alt="skibbdi"
            id="output"
            className="max-w-52"
            />
            <input type="file" accept="image/*" onChange={(event) => {loadFile(event)}} />
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="https://images.pexels.com/photos/4039724/pexels-photo-4039724.jpeg"
                width={32}
                height={32}
                className="rounded-full"
                alt="Skibbdi"
              />
              <h5 className="font-semibold">Ramesh</h5>
            </div>
            <textarea type="text" placeholder="Write a caption" className="w-full"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
