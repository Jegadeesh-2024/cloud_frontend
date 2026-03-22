import { useState } from "react";

const Header = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="p-4 border-b flex justify-between">

      <input
        type="text"
        placeholder="Search files..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-2 rounded w-1/2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>

    </div>
  );
};

export default Header;