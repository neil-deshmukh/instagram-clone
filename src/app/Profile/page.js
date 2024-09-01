"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import PostDeatails from "../components/PostDeatails.js";
import ProfilePicModal from "../components/ProfilePicModal";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [dposts, setDposts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const picUrl = "/defaultpic.jpeg"
  const [user, setUser] = useState({})
  const toggleDetails = (post) => {
    if (show) {
      setShow(false);
      fetch("http://localhost:5000/user"+JSON.parse(localStorage.getItem("user"))._id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((myPosts) => {
          setPosts(myPosts.posts);
          setUser(myPosts.user)
        });
    } else {
      setShow(true);
      setDposts(post);
    }
  };
  useEffect(() => {
    fetch(
      "http://localhost:5000/user/" +
        JSON.parse(localStorage.getItem("user"))._id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((myPosts) => {
        console.log(myPosts)
          setUser(myPosts.user)
        setPosts(myPosts.posts);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost:5000/user/" +
        JSON.parse(localStorage.getItem("user"))._id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((myPosts) => {
        setUser(myPosts.user);
        setPosts(myPosts.posts);
      });
  }, [changePic])
  return (
    <div>
      <Navbar />
      <div className="mt-[100px] flex flex-col items-center container mx-auto">
        <div className="flex space-x-28 items-center">
          <div className="rounded-full w-36 h-36 overflow-hidden">
            <Image
              src={user.photo ? user.photo : picUrl}
              width={160}
              height={160}
              alt="skibbdi"
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => setChangePic(true)}
            />
          </div>
          <div className="space-y-8">
            <h1 className="font-semibold text-lg">
              {user.username}
            </h1>
            <div className="flex space-x-9">
              <p>{posts.length} posts</p>
              <p className="cursor-pointer">
                {user.followers?.length} followers
              </p>
              <p className="cursor-pointer">
                {user.following?.length} following
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
      {changePic && (
        <ProfilePicModal setChangePic={setChangePic} />
      )}
    </div>
  );
}
