import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <div className="pt-24 flex flex-col items-center container mx-auto">
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
            <h1 className="font-semibold text-lg">Nwal Deshmukh</h1>
            <div className="flex space-x-9">
              <p>10 posts</p>
              <p className="cursor-pointer">10 followers</p>
              <p className="cursor-pointer">10 following</p>
            </div>
          </div>
        </div>
        <hr className="w-[600px] my-[40px] border-black" />
        <div className="grid grid-cols-3 w-[600px] gap-6 mb-20">
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            width={160}
            height={160}
            alt="skibbdi"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
