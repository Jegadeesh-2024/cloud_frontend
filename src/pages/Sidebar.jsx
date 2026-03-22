const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-100 p-4">

      <h2 className="font-bold text-lg mb-4">My Drive</h2>

      <ul>
        <li className="mb-2 cursor-pointer">📁 Root</li>
        <li className="mb-2 cursor-pointer">📁 Documents</li>
        <li className="mb-2 cursor-pointer">📁 Images</li>
      </ul>

    </div>
  );
};

export default Sidebar;