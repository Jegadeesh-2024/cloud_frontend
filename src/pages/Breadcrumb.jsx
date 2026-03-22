const Breadcrumb = ({ path = ["Home"] }) => {

  return (
    <div className="p-3 text-sm text-gray-600">

      {path.map((p, index) => (
        <span key={index}>
          {p}
          {index !== path.length - 1 && " > "}
        </span>
      ))}

    </div>
  );
};

export default Breadcrumb;