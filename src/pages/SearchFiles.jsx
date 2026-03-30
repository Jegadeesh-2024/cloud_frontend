import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const SearchFiles = () => {

  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  // 🔍 Search function
  const handleSearch = async (q) => {

    setQuery(q);
    setPage(1);

    const res = await axios.get(
      `${API}/files/search?q=${q}&page=1&limit=5`,
      {
        headers: { token }
      }
    );

    setFiles(res.data);
  };

  // 🔄 Load more (pagination)
  const loadMore = async () => {

    const nextPage = page + 1;

    const res = await axios.get(
      `${API}/files/search?q=${query}&page=${nextPage}&limit=5`,
      {
        headers: { token }
      }
    );

    setFiles(prev => [...prev, ...res.data]);
    setPage(nextPage);
  };

  return (

    <div className="p-3 md:p-6 max-w-xl mx-auto">

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search files..."
        onChange={(e)=>handleSearch(e.target.value)}
        className="w-full border p-2 md:p-3 rounded mb-4 text-sm md:text-base"
      />

      {/* 📁 Results */}
      <ul>

        {files.map(file => (
          <li key={file.id} className="border p-3 md:p-4 mb-2 rounded-lg shadow-sm bg-white flex justify-between items-center">
           <span className="text-sm md:text-base truncate">
            {file.name}
            </span> 
          </li>
        ))}

      </ul>

      {/* ⬇️ Load More */}
      <div className="flex justify-center">

      
      {files.length > 0 && (
        <button
          onClick={loadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Load More
        </button>
      )}
      </div>

    </div>

  );

};

export default SearchFiles;