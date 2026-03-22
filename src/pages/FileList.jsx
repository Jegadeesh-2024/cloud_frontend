import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal";
import Pagination from "./Pagination";

const API = "http://localhost:5000/api";

const FileList = ({ folderId, refresh, page, setPage, setTotalPages }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  //  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const limit = 5;
   const totalPages = 1;

  // fetch files
  const fetchFiles = async () => {
    if (!folderId) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/files/folder/${folderId}?page=${page}&limit=${limit}`,
        {
          headers: { token },
        },
      );

      setFiles(res.data.files || res.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (folderId) {
      fetchFiles();
    }
  }, [refresh, page, folderId]);

  // delete
  const deleteFile = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/files/${id}`, {
        headers: { token },
      });

      toast.success("File deleted");
      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  // rename
  const renameFile = async (file) => {
    const oldName = file.name;
    // 🔥 split extension
  const parts = oldName.split(".");
  const extension = parts.pop();       // jpg
  const baseName = parts.join(".");    // vijay

    const newName = prompt("Enter new file name",baseName);
    if (!newName) return;
    const finalName = `${newName}.${extension}`

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/files/rename`,
        { id:file.id, name: finalName },
        { headers: { token } },
      );

      toast.success("File renamed");
      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };
  const filteredFiles = files
    .filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date")
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });
  const viewFile = (file) => {
    if (!file.url) {
      alert("File URL not available");
      return;
    }

    window.open(file.url, "_blank"); // 🔥 open new tab
  };

  return (
    <div className="p-4">
      {/* 🔍 SEARCH + SORT */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-40"
        >
          <option value="">Sort</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* 📂 FILE CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredFiles.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No files found
          </p>
        )}

        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="border p-4 rounded-lg shadow bg-white hover:shadow-md transition"
          >
            <p className="text-3xl text-center">📄</p>

            <p className="text-sm mt-2 text-center truncate">{file.name}</p>

            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => renameFile(file)}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => viewFile(file)}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs"
              >
                View
              </button>

              <button
                onClick={() => deleteFile(file.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedFile(file)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Share
              </button>
            </div>
            
          </div>
        ))}
       
      </div>
       <Pagination totalPages={totalPages}
        currentPage={page}
        setCurrentPage={setPage}/>

      {/* Share Modal */}
      {selectedFile && (
        <ShareModal
          fileId={selectedFile.id}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default FileList;
