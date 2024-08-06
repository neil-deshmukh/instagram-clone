"use client"

import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "./components/Modal";

export default function Home() {
  const [posts, setPosts] = useState([])
  const notifyError = (msg) => ToastContainer.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      window.location.replace("/Signup")
    }
    fetch("http://localhost:5000/allposts")
      .then(res => res.json())
      .then(data => {data.error ? notifyError(data.error) : setPosts(data)})
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex flex-col space-y-7 items-center pt-5">
        {posts.map((post) => {
          return <Card post={post} key={post._id} />;
        })}
      </div>
      <Modal />
      <ToastContainer />
    </div>
  );
}
