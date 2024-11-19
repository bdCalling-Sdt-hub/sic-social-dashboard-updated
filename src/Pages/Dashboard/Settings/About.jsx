import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

import { toast } from "sonner";
import {
  useAddAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../../redux/api/aboutApi";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: aboutData } = useGetAboutQuery({});
  const [addAbout] = useAddAboutMutation();
  const [updateAbout] = useUpdateAboutMutation();

  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 400,
      background: "#FBF5EB",
    },
  };

  //add guideline  section
  const handleSubmit = async () => {
    const aboutData = {
      content,
    };
    try {
      const res = await addAbout(aboutData).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  const handleUpdate = async (id) => {
    const aboutData = {
      data: {
        content,
      },
      id,
    };

    try {
      const res = await updateAbout(aboutData).unwrap();
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
            About SIC
          </h3>
        </div>
        <div></div>
      </div>
      <div>
        <JoditEditor
          ref={editor}
          value={aboutData?.data[0]?.content}
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
        {aboutData?.data[0] ? (
          <button
            onClick={() => handleUpdate(aboutData?.data[0]?._id)}
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

export default About;