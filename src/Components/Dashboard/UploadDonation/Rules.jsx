import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const Rules = ({ setActiveTab, setRulesData }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Type Rule Definition...",
    style: {
      height: 300,
      background: "#FBF5EB",
    },
  };

  const handleNext = () => {
    if (!content) {
      toast.error("Please fill in all the required fields before proceeding.");

      return;
    }
    setRulesData(content);
    // Move to the next tab
    setActiveTab("3");
  };
  return (
    <div>
      <p className="text-[#A1A1A1]  font-semibold text-lg py-4">
        Rules & regulations
      </p>
      <div>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onChange={() => {}}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <button
            onClick={() => setActiveTab("1")}
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
            Back
          </button>
          <button
            onClick={() => handleNext()}
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
    </div>
  );
};

export default Rules;
