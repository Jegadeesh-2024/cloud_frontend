import { useState } from "react";
import { uploadFile } from "../api/fileApi";
import { useParams } from "react-router-dom";

const UploadFile = () => {
  const { folderId } = useParams();
  const [fileName, setFileName] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // 🔥 important safety

    setFileName(file.name); // ✅ ADD HERE

    if (!folderId) {
      alert("Folder not selected");
      return;
    }

    const data = await uploadFile(file, folderId);

    console.log(data);
  };

  return (
    <div className="p-3 md:p-6 w-full max-w-md mx-auto">
      <input
        type="file"
        onChange={handleFile}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="w-full border-2 border-dashed border-gray-300 p-6 md:p-10 text-center rounded-lg bg-white cursor-pointer flex flex-col items-center justify-center"
      >
        <span className="text-2xl mb-2">📤</span>
        <p className="text-sm md:text-base text-gray-600">Tap to upload file</p>
      </label>
      {fileName && (
        <p className="mt-2 text-sm text-gray-600 text-center truncate">
          {fileName}
        </p>
      )}
    </div>
  );
};

export default UploadFile;
