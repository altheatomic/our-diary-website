import { useRef, useState } from "react";
import defaultCover from "../assets/default-cover.jpg";
import defaultAvatar from "../assets/default-icon.png";

export default function CoverHeader({ title, setTitle }) {
  const [coverImage, setCoverImage] = useState(defaultCover);
  const [avatarImage, setAvatarImage] = useState(defaultAvatar);

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
    <>
      {/* Cover */}
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

      {/* Avatar */}
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
    </>
  );
}
