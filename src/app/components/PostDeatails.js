import Image from "next/image";
import { FaRegSmile } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import "./PostDetails.css"

export default function PostDeatails({ item, togglefunc }) {
  const removePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch("http://localhost:5000/deletepost/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => togglefunc());
    }
    
  }
  return (
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
            <div className="deletePost">
              <FaRegTrashCan fontSize={25} color="red" onClick={() => removePost(item._id)} />
            </div>
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
              // onChange={(e) => setComment(e.target.value)}
            />
            <button
            // onClick={() => {
            //   makeComment(comment, item._id);
            // }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="close-comment" onClick={togglefunc}>
        <RxCross2 fontSize={30} />
      </div>
    </div>
  );
}
