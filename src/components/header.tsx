import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="flex items-center gap-3 border-y px-4 py-2">
      <Image
        src="/logo.jpg"
        width={40}
        height={40}
        alt="threads"
        className="rounded-lg"
      />
      <h1 className="text-xl">Threads Web</h1>
      <span className="text-gray-500">| by Swaraj Bachu</span>
      <span className="text-gray-500 text-sm">unoffical</span>

    </div>
  );
}

export default Header;
