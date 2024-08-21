"use client"
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.js";
import Image from "next/image";
import { usePathname } from "next/navigation.js";
export default function UserProfile() {
  const pathname = usePathname().split("/")
  const userId = pathname[pathname.length-1]
  const [userData, setUserData] = useState({});
  const [following, setFollowing] = useState(false)
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(hisData => {
        setUserData(hisData)
        if (hisData.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
          setFollowing(true)
        }
      })
  }, [following])
  const followUser = (id) => {
    fetch("http://localhost:5000/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({followId: id})
    }).then(res => res.json())
      .then(data => {
        setFollowing(true)
      })
    .catch(err => console.log(err))
  }
  const unFollowUser = (id) => {
    fetch("http://localhost:5000/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowing(false)
      })
      .catch((err) => console.log(err));
  };
  console.log(userData);
  if (userData.user) {
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
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">
                  {userData.user.username}
                </h1>
                <button
                  className="cursor-pointer font-extrabold py-[13px] px-[25px] rounded-[15px] text-[0.8rem] border-none text-white bg-[#0115eb] ml-[20px] hover:-translate-y-3 hover:shadow-2xl"
                  style={{ transition: "all 0.25s ease" }}
                  onClick={() =>
                    following
                      ? unFollowUser(userData.user._id)
                      : followUser(userData.user._id)
                  }
                >
                  {following ? "Unfollow" : "Follow"}
                </button>
              </div>
              <div className="flex space-x-9">
                <p>{userData.posts.length} posts</p>
                <p className="cursor-pointer">
                  {userData.user.followers.length} followers
                </p>
                <p className="cursor-pointer">
                  {userData.user.following.length} following
                </p>
              </div>
            </div>
          </div>
          <hr className="w-[600px] my-[40px] border-black" />
          <div className="grid grid-cols-3 w-[600px] gap-6 mb-20">
            {userData.posts.map((post, i) => (
              <Image
                src={post.photo}
                width={160}
                height={160}
                alt="skibbdi"
                className="w-full h-full cursor-pointer"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex justify-center items-center text-3xl font-bold">
        <h1>Could Not Fetch</h1>
      </div>
    );
  }
}
