"use  client"

import Image from "next/image";
import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Card({ post, likefunc, unlikefunc, commentfunc, showCommentfunc }) {
  const [comment, setComment] = useState("")
  return (
    <div className="flex flex-col space-y-6 border border-gray-400 rounded py-4">
      <div className="flex items-center space-x-3 px-4">
        <Image
          src="https://images.pexels.com/photos/4039724/pexels-photo-4039724.jpeg"
          width={32}
          height={32}
          className="rounded-full"
          alt="Skibbdi"
        />
        <h5 className="font-semibold">{post.postedBy.username}</h5>
      </div>
      <div className="w-[500px]">
        <img src={post.photo} className="w-full" />
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-3 px-4">
          <div className="cursor-pointer">
            {post.likes.includes(
              JSON.parse(localStorage.getItem("user"))._id
            ) ? (
              <FaHeart
                fontSize={24}
                color="red"
                onClick={() => unlikefunc(post._id)}
              />
            ) : (
              <FaRegHeart fontSize={24} onClick={() => likefunc(post._id)} />
            )}
          </div>
          <p className="font-semibold">{post.likes.length} likes</p>
          <p className="text-gray-400">{post.body}</p>
          <p className="font-bold cursor-pointer" onClick={() => showCommentfunc(post)}>View All Comments</p>
        </div>
        <div className="flex items-center border-t border-gray-400 px-4 pt-3">
          <FaRegSmile fontSize={22} className="mr-2" />
          <input
            type="text"
            placeholder="Add your comment"
            className="pl-3 py-2 mr-3 w-full"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => {
            commentfunc(comment, post._id)
            setComment("")
          }}>Post</button>
        </div>
      </div>
    </div>
  );
}
