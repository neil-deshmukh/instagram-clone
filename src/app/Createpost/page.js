"use client"

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function CreatePost() {
  const [postData, setPostData] = useState({ photo: "", body: "" })
  const [url, setUrl] = useState("")
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const postPost = () => {
    const data = new FormData()
    data.append("file", postData.photo)
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "nwaloud");
    fetch("https://api.cloudinary.com/v1_1/nwaloud/image/upload", {
      method: "POST",
      body: data
    }).then(res => res.json()).then(data => setUrl(data.url)).catch(err => console.log(err))

    fetch("http://localhost:5000/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        body: postData.body,
        pic: url
      })
    }).then(res => res.json(res)).then(data => {
      if (data.error) {
        notifyError(data.error);
        return;
      } else {
        notifySuccess(data.message);
        localStorage.setItem("jwt", data.token);
        setFormData({ email: "", password: "" });
      }
    }).catch(err => console.log(err))
  }
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
            <button className="font-semibold border-none outline-none bg-none text-blue-600" onClick={(e) => {postPost()}}>
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
            <input type="file" accept="image/*" onChange={(event) => {
              loadFile(event);
              setPostData({...postData, photo: event.target.files[0]})
            }} />
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
            <textarea type="text" placeholder="Write a caption" value={postData.body} onChange={(e) => {setPostData({...postData, body: e.target.value})}} className="w-full"></textarea>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
