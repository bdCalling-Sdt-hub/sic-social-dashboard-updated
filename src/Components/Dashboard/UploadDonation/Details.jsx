import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "sonner";

const Details = ({ setActiveTab, setDetailsData }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null); // For handling the image file

  const config = {
    readonly: false,
    placeholder: "Type your description...",
    style: {
      height: 300,
      background: "#FBF5EB",
    },
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Access the first file uploaded
    setImage(file);
  };

  const handleNext = () => {
    if (!title || !image || !content) {
      toast.error("Please fill in all the required fields before proceeding.");

      return;
    }
    // Prepare the details data
    const detailsData = {
      title,
      image, // Image file
      content, // Jodit Editor content
    };

    // Optionally, pass this data up to the parent component
    setDetailsData(detailsData);

    // Move to the next tab
    setActiveTab("2");
  };
  return (
    <div>
      <div className="flex gap-5">
        <div className="w-full">
          <label className="text-[#A1A1A1] text-lg py-2">Name</label>
          <input
            type="text"
            onChange={handleTitleChange}
            className="p-3 w-full bg-[#FBF5EB] rounded-md"
            placeholder="Enter donation title"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-[#A1A1A1] text-lg p-3">Image</label>
          <input
            type="file"
            // value={donation?.details?.title || ""}
            onChange={handleImageChange}
            className="py-2 w-full bg-[#FBF5EB] rounded"
            accept="image/*"
            required
          />
        </div>
      </div>

      <p className="text-[#A1A1A1] font-semibold text-lg pb-4 mt-4">
        Donation Details
      </p>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onChange={() => {}}
        onBlur={(newContent) => setContent(newContent)}
      />

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleNext}
          style={{
            height: 44,
            width: 150,
            backgroundColor: "#D29E3B",
            color: "white",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Details;
