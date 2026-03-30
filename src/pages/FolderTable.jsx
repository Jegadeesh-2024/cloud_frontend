import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FolderTable = () => {
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchFolders = async () => {
    try {
      const res = await axios.get(`${API}/folders`, {
        headers: { token },
      });

      setFolders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const deleteFolder = async (id) => {
    if (!confirm("Are you sure delete this file")) {
      return;
    }

    try {
      await axios.delete(`${API}/folders/${id}`, {
        headers: { token },
      });

      toast.success("Folder deleted");

      fetchFolders();
    } catch (err) {
      console.log(err);
    }
  };

  const renameFolder = async (id) => {
    const newName = prompt("Enter new folder name");

    if (!newName) return;

    try {
      await axios.put(
        `${API}/folders/rename`,
        {
          id,
          name: newName,
        },
        {
          headers: { token },
        },
      );

      toast.success("Folder renamed");

      fetchFolders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-6 md:mt-10 w-full max-w-3xl mx-auto px-2 md:px-0">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
        Folders
      </h2>
      <div className="w-full overflow-x-auto">
        <div className="block md:hidden">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => {
                setActiveFolder(folder.id);
                navigate(`/files/${folder.id}`);
              }}
              className="bg-white p-3 rounded-lg shadow mb-3 cursor-pointer"
            >
              <p className="font-semibold text-sm truncate">{folder.name}</p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    renameFolder(folder.id);
                  }}
                  className="text-yellow-500 text-sm"
                >
                  ✏️
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFolder(folder.id);
                  }}
                  className="text-red-500 text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block mt-4">
          <table className="min-w-[400px] w-full border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border text-xs md:text-sm">Folder Name</th>
                <th className="p-2 border text-xs md:text-sm">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-gray-200">
              {folders.map((folder) => (
                // <tr key={folder.id} className="text-center" onClick={()=>setSelectedFolder(folder.id)}>
                <tr
                  key={folder.id}
                  onClick={() => {
                    setActiveFolder(folder.id);
                    navigate(`/files/${folder.id}`);
                  }}
                  className={`text-center cursor-pointer transition 
    ${activeFolder === folder.id ? "bg-purple-200" : "md:hover:bg-gray-100"}`}
                >
                  <td className="border p-2 text-xs md:text-sm break-all">
                    {folder.name}
                  </td>

                  <td className="border p-2 ">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          renameFolder(folder.id);
                        }}
                        className="text-yellow-500 cursor-pointer text-sm md:text-base"
                      >
                        ✏️
                      </button>
                      {/* 
                <button
                  onClick={(e) => 
                    e.stopPropagation();
                    deleteFolder(folder.id)}
                  className="text-red-500 cursor-pointer"
                >
                  🗑️
                </button> */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 🔥 THIS LINE FIX
                          deleteFolder(folder.id);
                        }}
                        className="text-red-500 cursor-pointer text-sm md:text-base"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FolderTable;
