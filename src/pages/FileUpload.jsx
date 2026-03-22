import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FileList from "./FileList";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

function FileUpload() {
  const API = "http://localhost:5000/api";

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("files");
  const [trashFiles, setTrashFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // imp:
  // const location = useLocation();
  const { folderId } = useParams();
  const selectedFolder = folderId;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select file");
      return;
    }

    try {
      setLoading(true);
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder_id", selectedFolder);

      const token = localStorage.getItem("token");

      await axios.post(`${API}/files/upload`, formData, {
        headers: { token },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      toast.success("File Uploaded Successfully");

      setFile(null);
      setError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setRefresh((prev) => !prev);
      setLoading(false);
      console.log("folderID", selectedFolder);
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1000);
    } catch (err) {
      toast.error("Upload failed");
      setLoading(false);
    }
  };
  const fetchSharedFiles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/files/shared-with-me`, {
        headers: { token },
      });

      setSharedFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTrashFiles = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/files/trash`, {
      headers: { token },
    });
    setTrashFiles(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const redirectFolder = () => {
    navigate("/folder")
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-white p-5 shadow-md">
        <h2 className="text-xl font-bold mb-6">My Drive</h2>

        <ul className="space-y-4">
         
          <li
            onClick={redirectFolder}
            className="cursor-pointer text-blue-600 font-semibold"
          >
            📁 My Folders
          </li>
           <li
            onClick={() => setView("files")}
            className={`cursor-pointer ${view === "files" ? "text-blue-600 font-semibold" : ""}`}
          >
            📁 My Files
          </li>

          <li
            onClick={() => {
              setView("trash");
              fetchTrashFiles();
            }}
            className={`cursor-pointer ${view === "trash" ? "text-blue-600 font-semibold" : ""}`}
          >
            🗑 Trash
          </li>
          <li
            onClick={() => {
              setView("shared");
              fetchSharedFiles();
            }}
            className={`cursor-pointer ${view === "shared" ? "text-blue-600 font-semibold" : ""}`}
          >
            👥 Shared With Me
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white p-4 shadow flex items-center ">
          <h1 className="font-semibold">Dashboard</h1>
          <button
          onClick={logout}
          className=" ml-auto bg-red-500 text-white px-4 py-2 rounded cursor-pointer w-20 justify-end"
        >
          Logout
        </button>
        </div>
        

        {/* Breadcrumb */}
        <div className="p-4 text-sm text-gray-500">
          Home / {view === "files" ? "My Files" : "Trash"}
        </div>

        {/* FILES VIEW */}
        {view === "files" && (
          <>
            {/* Upload */}
            <div className="p-4">
              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
                className="border-2 border-dashed p-10 text-center bg-white rounded shadow cursor-pointer"
              >
                Drag & Drop or Click to Upload
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {file && <p className="mt-2 text-sm">{file.name}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={uploadFile}
                disabled={loading}
                className="mt-3 bg-blue-600  text-white px-4 py-2 rounded"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploading && (
              <div className="mt-4 w-full max-w-md">
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 
          ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Percentage */}
                <p className="text-sm mt-1 text-center">{progress}%</p>
              </div>
            )}

            {/* File List */}
            <FileList
              refresh={refresh}
              setTotalPages={setTotalPages}
              page={page}
              setPage={setPage}
              folderId={selectedFolder}
            />
          </>
        )}

        {/* TRASH VIEW */}
        {view === "trash" && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trashFiles.length === 0 && (
              <p className="text-gray-400 col-span-full text-center">
                Trash is empty
              </p>
            )}

            {trashFiles.map((file) => (
              <div key={file.id} className="bg-white p-4 rounded shadow">
                <p className="text-center">📄</p>
                <p className="text-sm text-center truncate">{file.name}</p>

                <div className="flex justify-center gap-2 mt-3">
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      await axios.put(
                        `${API}/files/restore/${file.id}`,
                        {},
                        {
                          headers: { token },
                        },
                      );

                      toast.success("Restored");
                      fetchTrashFiles();
                      setRefresh((prev) => !prev);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Restore
                  </button>

                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      await axios.delete(`${API}/files/permanent/${file.id}`, {
                        headers: { token },
                      });

                      toast.success("Deleted permanently");
                      fetchTrashFiles();
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SHARE VIEW */}
        {view === "shared" && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {sharedFiles.length === 0 && (
              <p className="text-gray-400 col-span-full text-center">
                No shared files
              </p>
            )}

            {sharedFiles.map((file) => (
              <div key={file.id} className="bg-white p-4 rounded shadow">
                <p className="text-center">📄</p>
                <p className="text-sm text-center truncate">{file.name}</p>

                <p className="text-xs text-center text-gray-500 mt-1">
                  Permission: {file.permission}
                </p>

                <div className="flex justify-center gap-2 mt-3">
                  {/* VIEW */}
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      const res = await axios.get(
                        `${API}/files/url/${file.storage_key}`,
                        { headers: { token } },
                      );

                      window.open(res.data.signedUrl, "_blank");
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    View
                  </button>

                  {/* EDIT ONLY IF PERMISSION */}
                  {file.permission === "edit" && (
                    <button
                      onClick={() => {
                        const newName = prompt("Enter new name");
                        if (!newName) return;

                        axios.put(
                          `${API}/files/rename`,
                          {
                            id: file.id,
                            name: newName,
                          },
                          {
                            headers: { token: localStorage.getItem("token") },
                          },
                        );

                        toast.success("Edited");
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
