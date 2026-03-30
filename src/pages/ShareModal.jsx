import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ShareModal = ({ fileId, onClose }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");
  const [shares, setShares] = useState([]);
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 Fetch shared users
  const fetchShares = async () => {
    try {
      const res = await axios.get(`${API}/files/shared/${fileId}`, {
        headers: { token },
      });
      setShares(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (fileId) {
      fetchShares();
    }
  }, [fileId]);

  // 🔥 Share file
  const handleShare = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");

    try {
      await axios.post(
        `${API}/files/share`,
        {
          file_id: fileId,
          email,
          permission,
        },
        {
          headers: { token },
        },
      );

      setEmail("");
      fetchShares();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Share failed");
    }
  };

  // 🔥 Delete share
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/files/shares/${id}`, {
        headers: { token },
      });

      fetchShares();
    } catch (err) {
      console.log(err);
    }
  };
  // handleshare new:
  const handleGenerateLink = async () => {
    try {
      const res = await axios.post(
        `${API}/files/share/link/${fileId}`,
        {},
        { headers: { token } },
      );

      setShareLink(res.data.link);

      // copy to clipboard
      navigator.clipboard.writeText(res.data.link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-3">
      {" "}
      <div className="bg-white p-4 md:p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
          Share File
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 md:p-3 rounded mb-3 text-sm md:text-base cursor-pointer"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Permission */}
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full border p-2 md:p-3 rounded mb-3 text-sm md:text-base cursor-pointer"
        >
          <option value="view">Viewer</option>
          <option value="edit">Editor</option>
        </select>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 text-sm md:text-base"
        >
          Share
        </button>
        {/* <button
          onClick={handleGenerateLink}
          className=" cursor-pointer w-full bg-green-600 text-white py-2 rounded mb-4"
        >
          Generate Share Link 🔗
        </button>
        {shareLink && (
          <div className="bg-gray-100 p-2 rounded text-sm break-all">
            {shareLink}
          </div>
        )} */}

        {/* Shared Users */}
        <h3 className="font-semibold mb-2">Shared Users</h3>

        <ul>
          {shares.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap justify-between items-center gap-2 mb-2"
            >
              <span className="text-xs md:text-sm break-all">
                {s.shared_with_email} ({s.permission})
              </span>

              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-500 cursor-pointer text-sm md:text-base"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 w-full text-center md:w-auto cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
