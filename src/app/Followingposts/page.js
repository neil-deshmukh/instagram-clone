"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { FaRegSmile } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Card from "../components/Card";
import { toast, ToastContainer } from "react-toastify";
import "../components/Home.css";
import "react-toastify/dist/ReactToastify.css";


export default function followingPosts() {
  const [posts, setPosts] = useState([]);
  const [showComm, setShowComm] = useState(false);
  const [item, setItem] = useState([]);
  const [comment, setComment] = useState("");

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const toggleComment = (post) => {
    if (showComm) {
      setShowComm(false);
    } else {
      setShowComm(true);
      setItem(post);
    }
  };

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
        const newData = posts.map((post) => {
          if (post._id == result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
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
        setPosts(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (comment, id) => {
    fetch("http://localhost:5000/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: comment,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
        setComment("");
      });
  };

  useEffect(() => {
      fetch("http://localhost:5000/myfollowingposts", {
          headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
      .then((res) => res.json())
      .then((data) => {
        data.error ? notifyError(data.error) : setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
      <div>
          <Navbar />
      <div className="mx-auto flex flex-col space-y-7 items-center pt-5">
        {posts.map((post) => {
          return (
            <Card
              post={post}
              likefunc={likePost}
              unlikefunc={unlikePost}
              commentfunc={makeComment}
              showCommentfunc={toggleComment}
              key={post._id}
            />
          );
        })}
      </div>
      {showComm && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="skibid" />
            </div>
            <div className="details">
              <div className="flex items-center space-x-3 px-4 border-b border-[#00000029] p-3">
                <Image
                  src="https://images.pexels.com/photos/4039724/pexels-photo-4039724.jpeg"
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="Skibbdi"
                />
                <h5 className="font-semibold">{item.postedBy.username}</h5>
              </div>
              <div className="comment-section border-b border-[#00000029] flex flex-col">
                {item.comments.map((comment, i) => (
                  <p className="comm" key={i}>
                    <span className="commenter font-extrabold">
                      {comment.postedBy.username}
                    </span>
                    <span className="commentText">{comment.text}</span>
                  </p>
                ))}
                {item.comments.length < 1 && (
                  <div className="self-center mt-[150px]">
                    <h3 className="text-2xl font-extrabold">No comments yet</h3>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-3 px-4 py-3">
                <p className="font-semibold">{item.likes.length} likes</p>
                <p className="text-gray-400">{item.body}</p>
              </div>
              <div className="flex items-center border-t border-[#00000029] px-4 py-3">
                <FaRegSmile fontSize={22} className="mr-2" />
                <input
                  type="text"
                  placeholder="Add your comment"
                  className="pl-3 py-2 mr-3 w-full"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={() => {
                    makeComment(comment, item._id);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="close-comment" onClick={toggleComment}>
            <RxCross2 fontSize={30} />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
