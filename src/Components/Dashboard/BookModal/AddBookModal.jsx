import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { FaFilePdf, FaRegImage } from "react-icons/fa";
import { useAddBookMutation } from "../../../redux/api/bookApi";
import { toast } from "sonner";

const AddBookModal = ({
  openAddModel,
  setOpenAddModel,
  booksCategoryItems,
}) => {
  const [addBook] = useAddBookMutation();
  const [imgFile, setImgFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [category, setCategory] = useState("");
  const handleAddBook = async (values) => {
    const formData = new FormData();

    const addBookInfo = {
      ...values,
      category: category,
      coverImage: imgFile,
      bookPdf: pdfFile,
    };

    // Loop through `addBookInfo` and append all key-value pairs to formData
    for (const key in addBookInfo) {
      if (addBookInfo.hasOwnProperty(key)) {
        formData.append(key, addBookInfo[key]);
      }
    }

    try {
      const res = await addBook(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenAddModel(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        // null;
        // setImgFile(null);
        setOpenAddModel(false);
      }}
      width={600}
      footer={false}
    >
      <div className="p-6 ">
        <h1
          className="font-semibold text-[#555555] text-xl"
          style={{ marginBottom: "10px", marginTop: "8px" }}
        >
          Add Books category
        </h1>
        <Form onFinish={(values) => handleAddBook(values)}>
          <div>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input book name",
                },
              ]}
            >
              <Input
                placeholder="Enter book name"
                className="w-[100%] border outline-none px-3 py-[8px]"
                type="text"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="publisher"
              rules={[
                {
                  required: true,
                  message: "Please input publisher name",
                },
              ]}
            >
              <Input
                placeholder="Enter book publisher name"
                className="w-[100%] border outline-none px-3 py-[8px]"
                type="text"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="bookUrl"
              rules={[
                {
                  required: true,
                  message: "Please input book Url name",
                },
              ]}
            >
              <Input
                placeholder="Enter book book Url name"
                className="w-[100%] border outline-none px-3 py-[8px]"
                type="text"
              />
            </Form.Item>
          </div>

          <div style={{ width: "100%", marginBottom: "10px" }}>
            <p className="text-black py-1">Category </p>
            <Select
              onChange={(value) => setCategory(value)}
              placeholder="Select Category"
              style={{
                width: "100%",
                height: 40,
              }}
              options={booksCategoryItems}
            >
              {/* option for book category */}
            </Select>
          </div>

          <div className="mt-5">
            <p className="text-[#6D6D6D] py-1">Cover Image</p>

            <label
              htmlFor="coverImage"
              style={{ display: "block", margin: "4px 0" }}
              className="p-3 border"
            >
              <Form.Item>
                <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                  {imgFile ? (
                    <img src={URL.createObjectURL(imgFile)} alt="" />
                  ) : (
                    <FaRegImage className="text-2xl" />
                  )}
                </div>

                <div className="hidden">
                  <Input
                    id="coverImage"
                    type="file"
                    onInput={(e) => setImgFile(e.target.files[0])}
                    style={{
                      border: "1px solid #E0E4EC",
                      height: "52px",
                      background: "white",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                  />
                </div>
              </Form.Item>
            </label>
          </div>
          <div className="mt-5">
            <p className="text-[#6D6D6D] py-1">Book PDF</p>

            <label
              htmlFor="bookPdf"
              style={{ display: "block", margin: "4px 0" }}
              className="p-3 border"
            >
              <Form.Item>
                <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                  <FaFilePdf className="text-2xl" />
                </div>

                <div className="hidden">
                  <Input
                    id="bookPdf"
                    type="file"
                    onInput={(e) => setPdfFile(e.target.files[0])}
                    // style={{
                    //   border: "1px solid #E0E4EC",
                    //   height: "52px",
                    //   background: "white",
                    //   borderRadius: "8px",
                    //   outline: "none",
                    // }}
                  />
                </div>
              </Form.Item>
            </label>
          </div>

          <div className="text-center mt-8">
            <button className="bg-[#DBB162] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
              Upload Book
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
