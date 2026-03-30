import { useState } from "react";

const Header = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="p-3 md:p-4 border-b flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center">

      <input
        type="text"
        placeholder="Search files..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/2 text-sm md:text-base"
      />

      <button className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base w-full md:w-auto">
        Upload
      </button>

    </div>
  );
};

export default Header;