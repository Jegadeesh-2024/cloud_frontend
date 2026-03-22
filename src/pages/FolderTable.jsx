import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FolderTable = () => {

  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchFolders = async () => {

    try {

      const res = await axios.get(
        `${API}/folders`,
        {
          headers: { token }
        }
      );

      setFolders(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const deleteFolder = async (id) => {
    if (!confirm('Are you sure delete this file')) {
        return;
        
    }

    try {

      await axios.delete(
        `${API}/folders/${id}`,
        {
          headers: { token }
        }
      );


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
          name: newName
        },
        {
          headers: { token }
        }
      );

      toast.success("Folder renamed");

      fetchFolders();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="mt-10 w-full max-w-3xl mx-auto">

      <h2 className="text-xl font-bold mb-4">
        Folders
      </h2>

      <table className="w-full border border-gray-200">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Folder Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-gray-200">

          {folders.map((folder) => (

            // <tr key={folder.id} className="text-center" onClick={()=>setSelectedFolder(folder.id)}>
            <tr
  key={folder.id}
  onClick={() => {
    setActiveFolder(folder.id)
    navigate(`/files/${folder.id}`)
  }}
  className={`text-center cursor-pointer 
    ${activeFolder === folder.id ? "bg-purple-200" : ""}`}
>
              <td className="border p-2">
                {folder.name}
              </td>

              <td className="border p-2">

                <button
                  onClick={(e) =>{ e.stopPropagation()
                     renameFolder(folder.id)}}
                  className="text-yellow-500 mr-3 cursor-pointer"
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteFolder(folder.id)}
                  className="text-red-500 cursor-pointer"
                >
                  🗑️
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default FolderTable;