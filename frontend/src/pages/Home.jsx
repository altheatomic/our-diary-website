import { useRef, useState } from "react";
import defaultCover from "../assets/default-cover.jpg";
import defaultAvatar from "../assets/default-icon.png";

export default function Home() {
  const [coverImage, setCoverImage] = useState(defaultCover);
  const [avatarImage, setAvatarImage] = useState(defaultAvatar);
  const [title, setTitle] = useState("Personal Diary");

  // Refs để click input file khi double click ảnh
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      type === "cover" ? setCoverImage(imageUrl) : setAvatarImage(imageUrl);
    }
  };

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover cursor-pointer"
          onDoubleClick={() => coverInputRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={coverInputRef}
          onChange={(e) => handleImageChange(e, "cover")}
        />
      </div>

      {/* Avatar Container */}
      <div className="relative w-24 h-24 ml-36 -mt-12">
        <div className="w-full h-full overflow-hidden rounded-full border-4 border-white">
          <img
            src={avatarImage}
            alt="Avatar"
            className="w-full h-full object-cover cursor-pointer"
            onDoubleClick={() => avatarInputRef.current.click()}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={avatarInputRef}
          onChange={(e) => handleImageChange(e, "avatar")}
        />
      </div>

      {/* Title */}
      <div className="ml-28 mt-6">
        <input
          type="text"
          className="text-4xl font-bold text-left border-none focus:outline-none leading-relaxed"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Quote Box */}
      <div className="ml-28 mt-4 bg-gray-100 rounded-md px-4 py-2 flex items-center max-w-xl">
        {/* Quote */}
        <p className="text-gray-700 italic">
          Stay Hungry, Stay Foolish — <span className="not-italic">Steve Jobs</span>
        </p>
      </div>
    </div>
  );
}
