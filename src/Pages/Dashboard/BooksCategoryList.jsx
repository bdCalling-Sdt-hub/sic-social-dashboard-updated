import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import Logo from "../../assets/logo.png";
import {
  useAddBookCategoryMutation,
  useDeleteBookCategoryMutation,
  useGetBookCategoryQuery,
  useUpdateBookCategoryMutation,
} from "../../redux/api/bookCategoryApi";
import { toast } from "sonner";

// const data = [
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
//   {
//     key: "#1239",

//     category: <img src={Logo} height={48} width={48} />,
//     service_title: "Braids",
//   },
// ];

const BooksCategoryList = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [addCategory] = useAddBookCategoryMutation();
  const [updateBookCategory] = useUpdateBookCategoryMutation();
  const { data: categoryData, isLoading } = useGetBookCategoryQuery({});
  const [deleteBookCategory] = useDeleteBookCategoryMutation();
  // console.log(categoryData);
  // const [imgFile, setImgFile] = useState(null);
  // const [category, setCategory] = useState("location");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  // const handleChange = (e) => {
  //   setImgFile(e.target.files[0]);
  // };
  // const [itemForEdit, setItemForEdit] = useState(null);
  // const dropdownRef = useRef();
  // const items = [
  //   {
  //     label: "Car",
  //     key: "Car",
  //   },
  //   {
  //     label: "Bike",
  //     key: "Bike",
  //   },
  //   {
  //     label: "Cycle",
  //     key: "Cycle",
  //   },
  // ];

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBookCategory(id).unwrap();
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpenAddModel(false);
          }
        } catch (error) {
          // console.log(error);
          toast.error(error.message || "Something went wrong!!!");
        }
      }
    });
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDate(false);
  //       setOpen("");
  //       setFilter(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      key: "_id",
      render: (_text, _record, index) => {
        // console.log({ _text, _record, index });
        return <p key={index}>{index + 1}</p>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center",

      // render: (img, record) => {
      //   return (
      //     <div
      //       style={{
      //         display: "flex",
      //         justifyContent: "center",
      //         alignItems: "center",
      //         gap: 12,
      //       }}
      //     >
      //       <p> {img} </p>
      //       <p> {record?.service_title}</p>
      //     </div>
      //   );
      // },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <p
          key={record}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <button
            onClick={() => {
              setOpenUpdateModel(true);
              setUpdateId(record._id);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              color: "#DBB162",
              background: "white",
            }}
          >
            <CiEdit size={25} />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              background: "white",
              color: "red",
            }}
          >
            <FaRegTrashAlt size={20} />
          </button>
        </p>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  // const onClick = ({ key }) => {
  //   setCategory(key);
  //   const params = new URLSearchParams(window.location.search);
  //   params.set("category", key);
  //   window.history.pushState(null, "", `?${params.toString()}`);
  // };
  // for add category
  const handleAddCategory = async (value) => {
    const addCategoryInfo = {
      name: value.name,
    };
    // add category
    try {
      const res = await addCategory(addCategoryInfo).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenAddModel(false);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || "Something went wrong!!!");
    }
  };
  const handleUpdateCategory = async (value) => {
    const updateCategoryInfo = {
      data: {
        name: value.name,
      },
      id: updateId,
    };

    // update category
    try {
      const res = await updateBookCategory(updateCategoryInfo).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setOpenUpdateModel(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!!!");
    }
  };

  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
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
              style={{
                color: "black",
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              Books Category
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                borderRadius: 8,
                background: "#DBB162",
                height: 40,
                color: "white",
                fontSize: 14,
                fontWeight: "400",
              }}
              icon={<PlusOutlined />}
            >
              Add Category
            </Button>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            loading={isLoading}
            dataSource={categoryData?.data}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
              total: categoryData?.data?.length,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} out of ${total}`,
              defaultPageSize: 20,
              //   defaultCurrent: 1,
              style: {
                marginBottom: 20,
                marginLeft: 20,
                marginRight: 20,
                width: "100%",
                display: "flex",
                // gap: 10,
                // justifyContent: "space-between",
              },
            }}
          />
        </div>
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          // null;

          setOpenAddModel(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-[#555555] text-xl"
            style={{ marginBottom: "12px", marginTop: "8px" }}
          >
            Add Books category
          </h1>
          <Form onFinish={(value) => handleAddCategory(value)}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input category name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                // onClick={handleAddCategory}
                className="bg-[#DBB162] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* update category modal */}
      <Modal
        centered
        open={openUpdateModel}
        onCancel={() => {
          // null;

          setOpenUpdateModel(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-[#555555] text-xl"
            style={{ marginBottom: "12px", marginTop: "8px" }}
          >
            Update Books category
          </h1>
          <Form onFinish={(value) => handleUpdateCategory(value)}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input category name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-8">
              <button className="bg-[#DBB162] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default BooksCategoryList;
