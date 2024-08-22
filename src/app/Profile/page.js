"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import PostDeatails from "../components/PostDeatails.js";

export default function Profile() {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)
  const [dposts, setDposts] = useState([])
  const toggleDetails = (post) => {
    if (show) {
      setShow(false);
      fetch("http://localhost:5000/myposts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((myPosts) => {
          setPosts(myPosts);
        });
    } else {
      setShow(true);
      setDposts(post);
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(myPosts => {
        setPosts(myPosts)
      })
  }, [])
  return (
    <div>
      <Navbar />
      <div className="mt-[100px] flex flex-col items-center container mx-auto">
        <div className="flex space-x-28 items-center">
          <div className="rounded-full w-36 h-36 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              width={160}
              height={160}
              alt="skibbdi"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-8">
            <h1 className="font-semibold text-lg">
              {JSON.parse(localStorage.getItem("user")).username}
            </h1>
            <div className="flex space-x-9">
              <p>{posts.length} posts</p>
              <p className="cursor-pointer">
                {posts[0] ? posts[0].postedBy.followers.length : "0"} followers
              </p>
              <p className="cursor-pointer">
                {posts[0] ? posts[0].postedBy.following.length : "0"} following
              </p>
            </div>
          </div>
        </div>
        <hr className="w-[600px] my-[40px] border-black" />
        <div className="grid grid-cols-3 w-[600px] gap-6 mb-20">
          {posts.map((post, i) => (
            <Image
              src={post.photo}
              width={160}
              height={160}
              alt="skibbdi"
              className="w-full h-full cursor-pointer"
              key={i}
              onClick={() => toggleDetails(post)}
            />
          ))}
        </div>
      </div>
      {show && <PostDeatails item={dposts} togglefunc={toggleDetails} />}
    </div>
  );
}
