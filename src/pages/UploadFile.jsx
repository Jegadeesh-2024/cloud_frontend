// import { uploadFile } from "../api/fileApi";

// const UploadFile = () => {

//   const handleFile = async (e) => {

//     const file = e.target.files[0];

//     const data = await uploadFile(file);

//     console.log(data);

//   };

//   return (
//     <input type="file" onChange={handleFile}/>
//   );
// };

// export default UploadFile;

import { uploadFile } from "../api/fileApi";
import { useParams } from "react-router-dom";

const UploadFile = () => {

  const { folderId } = useParams();

  const handleFile = async (e) => {

    const file = e.target.files[0];

    if (!folderId) {
      alert("Folder not selected");
      return;
    }

    const data = await uploadFile(file, folderId);

    console.log(data);

  };

  return (
    <input type="file" onChange={handleFile}/>
  );
};

export default UploadFile;