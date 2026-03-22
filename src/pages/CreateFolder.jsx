import { useState } from "react";
import { createFolder } from "../api/folder.js";
import FolderTable from "./FolderTable.jsx";
import { useNavigate } from "react-router-dom";

const CreateFolder = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Folder name is required");
      return;
    }

    setError("");

    try {
      const data = await createFolder(name);

      navigate(`/files/${data.id}`, {
        state: { folderId: data.id }
      });

      setName("");

    } catch (err) {
      console.log(err);
      setError("Failed to create folder");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-5 shadow-md">
        <h2 className="text-xl font-bold mb-6">My Drive</h2>

        
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 TOPBAR */}
        <div className="bg-white p-4 shadow flex items-center justify-between w-full">
          <h1 className="font-semibold text-lg">Folder</h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="relative flex flex-col items-center p-6 flex-1">

          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-pink-900/70"></div>

          <div className="relative z-10 flex flex-col items-center w-full">

            {/* CREATE FOLDER CARD */}
            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-md mb-10">

              <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                Create Folder
              </h2>

              <input
                type="text"
                placeholder="Folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
              />

              {error && (
                <p className="text-red-500 text-sm mb-2">{error}</p>
              )}

              <button
                onClick={handleCreate}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg"
              >
                Create Folder
              </button>
            </div>

            {/* FOLDER TABLE */}
            <FolderTable selectedFolder={selectedFolder} />

          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateFolder;