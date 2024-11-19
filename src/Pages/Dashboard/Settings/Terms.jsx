import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

import { toast } from "sonner";
import {
  useAddTermsMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "../../../redux/api/termsApi";

const Terms = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [addTerms] = useAddTermsMutation();
  const [updateTerms] = useUpdateTermsMutation();
  const { data: termsData } = useGetTermsQuery({});

  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 400,
      background: "#FBF5EB",
    },
  };

  //add faq section
  const handleSubmit = async () => {
    const termsData = {
      content,
    };

    try {
      const res = await addTerms(termsData).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  const handleUpdate = async (id) => {
    const termsData = {
      data: {
        content,
      },
      id,
    };

    try {
      const res = await updateTerms(termsData).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  return (
    <div className=" bg-white px-4 py-2 rounded-lg pb-10 ">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <div>
          <h3
            className="font-semibold"
            style={{
              color: "black",
              fontSize: 22,
              fontWeight: "500",
            }}
          >
            Terms and Conditions
          </h3>
        </div>
        <div></div>
      </div>
      <div>
        <JoditEditor
          ref={editor}
          value={termsData?.data[0]?.content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {termsData?.data[0] ? (
          <button
            onClick={() => handleUpdate(termsData?.data[0]?._id)}
            style={{
              height: 44,
              width: 150,
              backgroundColor: "#DBB162",
              color: "white",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Update Changes
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              height: 44,
              width: 150,
              backgroundColor: "#DBB162",
              color: "white",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Terms;
