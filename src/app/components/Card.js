import Image from "next/image";
import { FaRegSmile } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";


export default function Card() {
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
        <h5 className="font-semibold">Ramesh</h5>
      </div>
      <div className="w-[500px]">
        <img
          src="https://images.pexels.com/photos/957089/veil-cases-waterfall-autumn-alpine-957089.jpeg"
          className="w-full"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-3 px-4">
          <FaRegHeart fontSize={24} />
          <p className="font-semibold">2 likes</p>
          <p className="text-gray-400">This is amasing</p>
        </div>
        <div className="flex items-center border-t border-gray-400 px-4 pt-3">
          <FaRegSmile fontSize={22} className="mr-2" />
          <input
            type="text"
            placeholder="Add your comment"
            className="pl-3 py-2 mr-3 w-full"
          />
          <button>Post</button>
        </div>
      </div>
    </div>
  );
}