import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal"; // ✅ import

function FileTable() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ new

  const API = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API}/files`, {
        headers: { token },
      });

      setFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (id) => {
    try {
      await axios.delete(`${API}/files/${id}`, {
        headers: { token },
      });

      toast.success("File deleted");

      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const renameFile = async (id) => {
    const newName = prompt("Enter new file name");

    if (!newName) return;

    try {
      await axios.put(
        `${API}/files/rename`,
        {
          id,
          name: newName,
        },
        {
          headers: { token },
        },
      );

      toast.success("File renamed");

      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-6 md:mt-10 w-full max-w-4xl mx-auto px-2 md:px-0">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
        Uploaded Files
      </h2>

      <div className="w-full overflow-x-auto">
        <div className="block md:hidden">
          {files.map((file) => (
            <div key={file.id} className="border p-3 rounded mb-3 shadow">
              <p className="font-semibold text-sm">{file.name}</p>

              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => renameFile(file.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFile(file.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>

                <button
                  onClick={() => setSelectedFile(file.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <table className="min-w-[500px] w-full border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border text-xs md:text-sm">File Name</th>
                <th className="p-2 border text-xs md:text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="text-center hover:bg-gray-100">
                  <td className="border p-2 text-xs md:text-sm break-all">
                    {file.name}
                  </td>

                  <td className="border p-2 text-xs md:text-sm break-all">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => renameFile(file.id)}
                        className="bg-yellow-500 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteFile(file.id)}
                        className="bg-yellow-500 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                      {/* 🔥 Share (ADD HERE) */}
                      <button
                        onClick={() => setSelectedFile(file.id)}
                        className="bg-yellow-500 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm cursor-pointer"
                      >
                        Share
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* 🔥 Modal */}
      {selectedFile && (
        <ShareModal
          fileId={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}

export default FileTable;
