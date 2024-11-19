import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { RiLoader3Fill } from "react-icons/ri";
import Logo from "../../assets/logo.png";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdPersonOff } from "react-icons/md";
import { useGetFeedBackQuery } from "../../redux/api/feedbackApi";
import dayjs from "dayjs";

// const data = [
//   {
//     key: "#1239",

//     user: {
//       name: "Mr. Mahmud",
//       img: <img src={Logo} height={48} width={48} />,
//     },

//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1238",

//     user: {
//       name: "Lily",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1237",

//     user: {
//       name: "Kathry",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1236",

//     user: {
//       name: "Priscilla",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1235",

//     user: {
//       name: "Claire",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1234",

//     user: {
//       name: "Irmar",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1233",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1233",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1233",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#1233",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },

//   {
//     key: "#4",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#5",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#6",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#7",
//     name: "Nadir",
//     user: {
//       name: "Ashutosh",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#8",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#9",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#10",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
//   {
//     key: "#11",

//     user: {
//       name: "Gloria",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     feedback: "i see some problem",
//     date: "01/01/2025",
//   },
// ];

const Feedback = () => {
  const { data: feedbackData, isLoading } = useGetFeedBackQuery({});
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [block, setBlock] = useState(false);
  const dropdownRef = useRef();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDate(false);
        setOpen("");
        setFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const handleBlock = (value) => {
  //   console.log(value?.key);
  //   if (value?.key) {
  //     setBlock(!block);
  //   }
  // };
  // console.log(feedback);
  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      key: "_id",
      render: (_a, _b, index) => {
        // console.log({ _a, _b, index });
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId.fullName",
      align: "start",
      render: (user) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 12,
            }}
          >
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
              src={user?.avatar}
              alt="user avatar"
            />

            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
              }}
            >
              {user?.fullName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Feedbacks",
      dataIndex: "feedback",
      key: "feedback",
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (date) => {
        return <p>{dayjs(date).format("DD-MMM-YYYY")}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          <button
            onClick={() => {
              setFeedback(record.feedback);
              setOpen(true);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
            className=" text-[#DBB162] font-medium"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  // console.log(feedbackData?.data?.result);
  return (
    <div className="">
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
              All Feedbacks
            </h3>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={feedbackData?.data?.result}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
              total: feedbackData?.data?.result?.length,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} out of ${total}`,
              defaultPageSize: 20,
              // defaultCurrent: 1,
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
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={500}
      >
        <div className="p-6">
          <h1
            className=" text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Feedback details
          </h1>
          <form>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                type="Text"
                value={feedback}
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
                name="ans"
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Feedback;
