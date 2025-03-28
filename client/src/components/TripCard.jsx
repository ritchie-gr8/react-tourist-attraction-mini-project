import React, { useState } from "react";
import { Check, Link } from "lucide-react";

const TripCard = ({
  id,
  url,
  title,
  description,
  photos,
  tags,
  className = "",
}) => {
  const mainPhoto = photos?.[0] || "https://placehold.co/600x400";
  const additionalPhotos = photos?.slice(1) || [];

  const [copied, setCopied] = useState(false);

  const copyCode = (val) => {
    navigator.clipboard.writeText(val);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className={`flex gap-4 relative ${className} flex-col sm:flex-row`}>
      <div className="w-auto max-h-[300px] min-w-[300px] md:min-w-[400px] max-w-[400px] rounded-2xl overflow-hidden">
        <img
          src={mainPhoto}
          alt={`Main image for ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <a href={url} target="_blank">
          <h3 className="text-2xl font-bold">{title}</h3>
        </a>
        <p className="text-sm text-gray-500 line-clamp-1">{description}</p>
        <a href={url} target="_blank" className="underline text-blue-400">
          อ่านต่อ
        </a>
        <p className="text-gray-600">
          หมวด{" "}
          {tags.map((tag, idx) => (
            <React.Fragment key={`${id}-tag-${idx}`}>
              {idx > 0 && (idx === tags.length - 1 ? " และ " : " ")}
              <span className="underline">{tag}</span>
            </React.Fragment>
          ))}
        </p>
        <div className="flex gap-4 flex-wrap">
          {additionalPhotos.map((image, idx) => (
            <div
              key={`${id}-photo-${idx}`}
              className="w-[100px] h-[100px] rounded-2xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Additional image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-2 right-2 rounded-full border p-1 cursor-pointer bg-white ${
          copied ? "border-green-400" : "border-blue-400"
        }`}
        onClick={() => copyCode(url)}
      >
        {copied ? (
          <Check className="text-green-400 w-6 h-6" />
        ) : (
          <Link className="text-blue-400 w-6 h-6" />
        )}
      </div>
    </div>
  );
};

export default TripCard;
