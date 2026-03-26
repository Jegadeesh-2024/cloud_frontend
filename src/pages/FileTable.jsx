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

      const res = await axios.get(
        `${API}/files`,
        {
          headers: { token }
        }
      );

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

      await axios.delete(
        `${API}/files/${id}`,
        {
          headers: { token }
        }
      );

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
       `${API}/files/rename` ,
        {
          id,
          name: newName
        },
        {
          headers: { token }
        }
      );

      toast.success("File renamed");

      fetchFiles();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="mt-10 w-full max-w-4xl mx-auto">

      <h2 className="text-xl font-bold mb-4">
        Uploaded Files
      </h2>

      <table className="w-full border border-gray-200">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">File Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>

          {files.map((file) => (

            <tr key={file.id} className="text-center">

              <td className="border p-2">
                {file.name}
              </td>

              <td className="border p-2">

                <button
                  onClick={() => renameFile(file.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFile(file.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
                {/* 🔥 Share (ADD HERE) */}
                <button
                  onClick={() => setSelectedFile(file.id)}
                  className=" cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Share
                </button>
                

              </td>

            </tr>

          ))}

        </tbody>

      </table>
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