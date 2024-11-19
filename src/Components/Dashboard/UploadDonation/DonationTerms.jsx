import JoditEditor from "jodit-react";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const DonationTerms = ({
  setActiveTab,
  handleSubmitAllData,
  setTermsData,
  donationData,
  termsData,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(termsData || ""); // Initialize with termsData

  const config = {
    readonly: false,
    placeholder: "Typing terms...",
    style: {
      height: 300,
      background: "#FBF5EB",
    },
  };

  // Update termsData with the current content whenever content changes
  useEffect(() => {
    setTermsData(content);
  }, [content, setTermsData]);

  const handleNext = () => {
    // Trigger blur manually to capture the latest content
    editor.current.blur();

    if (!content) {
      toast.error("Please fill in all the required fields before proceeding.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (donationData?.data[0]) {
          handleSubmitAllData("update");
        } else {
          handleSubmitAllData("add");
        }
      }
    });
  };

  return (
    <div>
      <p className="text-[#A1A1A1] font-semibold text-lg py-4">
        Terms & conditions
      </p>
      <div>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onChange={() => {}} // Capture content on change
            onBlur={(newContent) => setContent(newContent)} // Capture on blur as well
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
            onClick={() => setActiveTab("2")}
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
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationTerms;
