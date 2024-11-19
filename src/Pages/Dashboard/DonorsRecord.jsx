import { useEffect, useRef, useState } from "react";
import { Dropdown, Input, Modal, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { RiLoader3Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { useGetDonorQuery } from "../../redux/api/donorApi";

// const data = [
//   {
//     key: "#1239",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "mr101@mail.ru",
//     contact: "(+33)7 00 55 59 27",
//     location: "Corona, Michigan",
//     amount: 800,
//   },
//   {
//     key: "#1238",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "xterris@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Great Falls, Maryland ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
//   {
//     key: "#1237",

//     salon: {
//       name: "SalonName",
//       img: <img src={Logo} height={48} width={48} />,
//     },
//     email: "irnabela@gmail.com",
//     contact: "(+33)7 00 55 59 27",
//     location: "Syracuse, Connecticut ",
//     amount: 800,
//   },
// ];

const DonorsRecord = () => {
  const { data: donorData } = useGetDonorQuery({});
  const donors = donorData?.data?.result;
  const meta = donorData?.data?.meta;

  const [category, setCategory] = useState("Activity");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const items = [
    {
      label: "Car",
      key: "Car",
    },
    {
      label: "Bike",
      key: "Bike",
    },
    {
      label: "Cycle",
      key: "Cycle",
    },
  ];

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

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Salon",
      dataIndex: "salon",
      key: "salon",
      render: (salon) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <p> {salon?.img}</p>

            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
              }}
            >
              {salon?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Address",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClick = ({ key }) => {
    setCategory(key);
    const params = new URLSearchParams(window.location.search);
    params.set("category", key);
    window.history.pushState(null, "", `?${params.toString()}`);
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
                color: "#6A5ECC",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              All Donor Record
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "370px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <Input
                placeholder="Search..."
                prefix={<FiSearch size={14} color="#868FA0" />}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "14px",
                }}
                size="middle"
              />
            </div>

            <div
              style={{
                width: "115px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                color: "#8B8B8B",
                fontSize: 14,
              }}
            >
              {category}
              <Dropdown menu={{ items, onClick }}>
                <p
                  style={{
                    cursor: "pointer",
                    color: "#717171",
                    borderRadius: "4px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <DownOutlined
                    style={{ paddingLeft: "18px" }}
                    color="#717171"
                  />
                </p>
              </Dropdown>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px 8px",
                color: "#F2F2F2",
                cursor: "pointer",
                background: "#DBB162",
              }}
            >
              <RiLoader3Fill size={20} />
            </div>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            dataSource={donors}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
              total: meta?.total,
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
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={700}
      >
        <div>
          <div className="flex justify-center items-center flex-col gap-4">
            <img
              className="w-full h-[150px]"
              src="https://i.ibb.co/CBvrNxh/Rectangle-5252.png"
              alt=""
            />
            <div className="flex justify-center items-center flex-col gap-2 -mt-16">
              <div className="w-20 h-20 rounded-full relative">
                <img
                  className="w-full h-full rounded-full"
                  src="https://i.ibb.co/B2xfD8H/images.png"
                  alt=""
                />
              </div>
              <p className="text-base font-semibold">Md. Mahmud</p>
              <div className="flex justify-start items-center gap-2">
                <FaStar className="text-yellow-500" />
                <p>4.5/5</p>
              </div>
              <p>Total earning : 2000€</p>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-start items-start gap-3 p-6">
            <div>
              <p className="text-sm font-semibold mb-1">Salon Name</p>
              <p className=" text-xs">Mr. Mahmud</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <p className=" text-xs">mahmud@gmail.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className=" text-xs">
                76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Contact No</p>
              <p className=" text-xs">+099999</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Experience</p>
              <p className=" text-xs">5 year</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Salon type</p>
              <p className=" text-xs">All</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Bank Account no.</p>
              <p className=" text-xs">321656295461</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">About</p>
              <p className=" text-xs">
                dui. at tortor. nisi vitae Nullam adipiscing malesuada faucibus
                sit lacus orci Nam ac convallis. amet, elit. Donec elit massa
                nisl. hendrerit lorem. nec nisi
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DonorsRecord;
