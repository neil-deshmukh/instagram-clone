"use client"
import { useEffect, useRef, useState } from "react";
import "./Modal.css"

export default function ProfilePicModal({setChangePic}) {
  const hiddenImageInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const handleClick = () => {
    hiddenImageInput.current.click();
  };
  const postPic = () => {
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json(res))
      .then((data) => {
        setChangePic(false);
      })
      .catch((err) => console.log(err));
  };
  const postProfilePic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "nwaloud");
    fetch("https://api.cloudinary.com/v1_1/nwaloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (image) {
      postProfilePic();
    }
  }, [image]);
  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);
  return (
    <div className="darkBg">
      <div className="centered rounded-[20px] bg-white">
        <div className="py-[25px] px-[80px] flex justify-center">
          <h1 className="font-bold text-xl">Change Profile Picture</h1>
        </div>
        <div className="py-[15px] px-[80px] space-y-4 flex flex-col items-center border-y border-[#00000030]">
          <button
            className="cursor-pointer bg-none border-none font-extrabold text-[15px] block text-[#1EA1F7]"
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={hiddenImageInput}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="py-[15px] px-[80px] space-y-4 flex justify-center border-b border-[#00000030]">
          <button className="cursor-pointer bg-none border-none font-extrabold text-[15px] block text-[#ED4956]" onClick={() => {
            setUrl(null)
            postPic()
          }}>
            Remove Current Photo
          </button>
        </div>
        <div className="py-[15px] px-[80px] space-y- flex justify-center border-b border-[#00000030]">
          <button className="cursor-pointer bg-none border-none text-[15px] block" onClick={() => setChangePic(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
