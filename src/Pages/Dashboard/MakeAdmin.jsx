import { useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useAddAdminMutation,
  useGetAdminQuery,
  useUpdateAdminStatusMutation,
} from "../../redux/api/adminApi";
import { toast } from "sonner";

const SalonCategoryList = () => {
  const [addAdmin] = useAddAdminMutation();
  const { data: adminData } = useGetAdminQuery({});
  const [useUpdateAdminStatus] = useUpdateAdminStatusMutation();
  const [openAddModel, setOpenAddModel] = useState(false);
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  // const dropdownRef = useRef();

  const handleDelete = (record) => {
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
        let status = "";
        if (record.status === "active") {
          status = "block";
        } else if (record.status === "blocked") {
          status = "unblock";
        }
        const updatedUserStatus = {
          data: {
            status: status,
          },
          id: record._id,
        };
        const res = await useUpdateAdminStatus(updatedUserStatus).unwrap();
        if (res.success) {
          Swal.fire({
            text: res.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
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
      render: (_a, _b, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Admin Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Admin Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <p
            style={{
              color: status == "active" ? "green" : "red",
            }}
          >
            {status}
          </p>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      textAlign: "center",
      render: (_, record) => (
        <button
          onClick={() => handleDelete(record)}
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            background: "#DBB162",
            color: "white",
            borderRadius: "10px",
            padding: "4px",
          }}
        >
          Change Status
        </button>
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

  // const onSelect = (newValue) => {
  //   const date = newValue.format("MMM-DD-YYYY");
  //   setValue(date);
  //   const params = new URLSearchParams(window.location.search);
  //   params.set("date", date);
  //   window.history.pushState(null, "", `?${params.toString()}`);
  // };

  const handleAddAdmin = async (values) => {
    // console.log(values);

    try {
      const res = await addAdmin(values).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenAddModel(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
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
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Make Admin
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
              Add Admin
            </Button>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            dataSource={adminData?.data?.result}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
              total: adminData?.data?.result?.length,
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
          setOpenAddModel(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-black text-xl"
            style={{ marginBottom: "12px" }}
          >
            {`Add new Admin`}
          </h1>
          <Form onFinish={(values) => handleAddAdmin(values)}>
            <div>
              <p className="text-[#6D6D6D] py-1">Full Name</p>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    min: 3,
                    message: "Name must be at least 3 characters",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>
            <div>
              <p className="text-[#6D6D6D] py-1">Email </p>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input email Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="mt-5">
              <p className="text-[#6D6D6D] py-1">Password </p>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]}
              >
                <Input.Password
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-[#DBB162] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                create Profile
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SalonCategoryList;
