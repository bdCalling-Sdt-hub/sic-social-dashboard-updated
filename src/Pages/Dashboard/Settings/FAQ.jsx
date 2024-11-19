import { Form, Input, Modal, Table, Button, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "../../../redux/api/faqApi";
import { toast } from "sonner";

const FAQ = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editID, seteditID] = useState("");
  const [question, setQuestion] = useState("");
  const [ans, setans] = useState("");
  //redux hooks for add faq
  const [addFaq] = useAddFaqMutation();
  // redux hooks for get faq
  const { data: faqData, isLoading } = useGetFaqQuery({});
  // redux hooks for update faq
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  //add faq section
  const handelsubmit = async (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const answer = e.target.answer.value;
    if (!question || !answer) {
      return false;
    }

    const faqInfo = {
      question,
      answer,
    };
    // add faq
    try {
      const res = await addFaq(faqInfo).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenAddModel(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  //update faq
  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(editID);
    const updatedFaq = {
      data: {
        question,
        answer: ans,
      },
      id: editID,
    };

    // console.log(updatedFaq);
    // update faq
    try {
      const res = await updateFaq(updatedFaq).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenEditModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  const handeldelete = async () => {
    // console.log(editID);
    const deleteFaqData = {
      id: deleteId,
    };
    // update faq
    try {
      const res = await deleteFaq(deleteFaqData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowDelete(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  return (
    <div className="bg-white  px-3 py-2 rounded-lg">
      <div style={{ margin: "24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: "24px", fontWeight: 600, color: "black" }}>
            Frequently Asked Questions
          </h3>
          <button
            onClick={() => setOpenAddModel(true)}
            style={{
              borderRadius: "4px",
              color: "#F2F2F2",
              backgroundColor: "#DBB162",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              padding: "10px 20px",
              fontWeight: "500",
            }}
          >
            <FaPlus
              style={{
                marginTop: "-2px",
              }}
            />
            Add FAQ
          </button>
        </div>
      </div>
      <div className="bg-white py-6 px-4 rounded-md">
        {faqData?.data?.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 ">
            <div className="mt-3">
              <GoQuestion color="#DBB162" size={25} />
            </div>
            <div className="w-full ">
              <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8 bg-slate-50">
                <span className=" flex-1 "> {item?.question}</span>
              </p>
              <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-xl my-4 bg-slate-50">
                <p className="text-[#919191] leading-[24px] mb-6 ">
                  {item?.answer}
                </p>
              </div>
            </div>
            <div className="w-[4%] flex justify-start items-center pt-4 gap-2">
              <CiEdit
                onClick={() => {
                  setOpenEditModal(true);
                  const filterdData = faqData?.data?.filter(
                    (filterId) => filterId?._id === item?._id
                  );
                  setQuestion(filterdData[0]?.question);
                  setans(filterdData[0]?.answer);
                  seteditID(item?._id);
                }}
                className="text-2xl cursor-pointer text-[#DBB162]"
              />
              <RxCross2
                onClick={() => {
                  setDeleteId(item?._id);
                  setShowDelete(true);
                }}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1
            className=" text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Add FAQ
          </h1>
          <form onSubmit={handelsubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) => {
                  setans(e.target.value);
                }}
                type="Text"
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                name="answer"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                border: "none",
                height: "44px",
                background: "#DBB162",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value={`Save & change`}
              type="submit"
            />
          </form>
        </div>
      </Modal>
      <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1
            style={{ marginBottom: "12px" }}
            className=" text-[20px] font-medium"
          >
            Update FAQ
          </h1>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) => {
                  setans(e.target.value);
                }}
                type="Text"
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                border: "none",
                height: "44px",
                background: "#6A5ECC",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value={`Save & change`}
              type="submit"
            />
          </form>
        </div>
      </Modal>
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#6A5ECC] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handeldelete}
            className="bg-[#DBB162] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
