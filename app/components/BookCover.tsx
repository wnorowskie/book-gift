import Image from "next/image";

interface BookCoverProps {
  src: string;
  title: string;
  className?: string;
}

export function BookCover({ src, title, className = "" }: BookCoverProps) {
  // Use a plain img tag for simplicity and to support both local and external URLs
  // without needing to configure domains in next.config.js
  return (
    <img
      src={src}
      alt={`Cover of ${title}`}
      className={`w-full h-auto object-cover ${className}`}
    />
  );
}
