"use client";

import Navbar from "./Navbar.js";
import Card from "./Card.js";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { LoginContext } from "../loginContext.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const notifyError = (msg) => ToastContainer.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
    const likePost = (id) => {
      fetch("http://localhost:5000/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = posts.map(post => {
            if (post._id == result._id) {
              return result
            } else {
              return post
            }
          })
          setPosts(newData)
        })
        .catch((err) => console.log(err));
    };
    const unlikePost = (id) => {
      fetch("http://localhost:5000/unlike", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = posts.map((post) => {
            if (post._id == result._id) {
              return result;
            } else {
              return post;
            }
          });
          setPosts(newData)
        })
        .catch((err) => console.log(err));
    };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.replace("/Signup");
    }
    fetch("http://localhost:5000/allposts")
      .then((res) => res.json())
      .then((data) => {
        data.error ? notifyError(data.error) : setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="mx-auto flex flex-col space-y-7 items-center pt-5">
        {posts.map((post) => {
          return <Card post={post} likefunc={likePost} unlikefunc={unlikePost} key={post._id} />;
        })}
      </div>
      <ToastContainer />
    </div>
  );
}
