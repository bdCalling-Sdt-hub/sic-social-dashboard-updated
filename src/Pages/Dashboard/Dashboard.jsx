import { Layout } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

import { LuUser } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { LiaDonateSolid } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { FiUserPlus, FiLogOut } from "react-icons/fi";
import { VscBook, VscFeedback } from "react-icons/vsc";
import { RiNotification2Line } from "react-icons/ri";
import donorIcon from "../../assets/donor.png";
import Swal from "sweetalert2";
import { useGetUserProfileQuery } from "../../redux/api/userApi";
import { getUserRole } from "../../utils/utils";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { data } = useGetUserProfileQuery({});
  const user = data?.data;
  // console.log(user);
  const [setting, setSetting] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // console.log(setting);
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/login");
        localStorage.removeItem("accessToken");
        Swal.fire({
          text: "User logged out successfully!!!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const role = getUserRole();
  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdOutlineDashboard size={24} />,
    },
    {
      title: "User Details",
      path: "/user-list",
      icon: <LuUser size={24} />,
    },
    {
      title: "Upload donation",
      path: "/upload-donation",
      icon: <LiaDonateSolid size={24} />,
    },
    {
      title: "Donors Record",
      path: "/donors-record",
      icon: <img src={donorIcon} />,
    },
    {
      title: "Books Category",
      path: "/books-category-list",
      icon: <TbCategoryPlus size={24} />,
    },
    {
      title: "Books List",
      path: "/books-list",
      icon: <VscBook size={24} />,
    },
    {
      title: "Settings",
      path: "/setting",
      icon: <IoSettingsOutline size={24} />,
      option: true,
      optionsItems: [
        { title: "FAQ", path: "/faq" },
        { title: "Privacy Policy", path: "/privacy" },
        { title: "Terms & Condition", path: "/terms" },
        { title: "SIC guidelines", path: "/sic" },
        { title: "About Us", path: "/about" },
      ],
    },
    {
      title: "Notifications",
      path: "/notification",
      icon: <GoBell size={24} />,
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: <VscFeedback size={24} />,
    },
    // Conditionally render "Add admin" based on user role
    ...(role === "SUPER-ADMIN"
      ? [
          {
            title: "Add admin",
            path: "/make-admin",
            icon: <FiUserPlus size={24} />,
          },
        ]
      : []), // If the user is not Super Admin, nothing is added here
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="15vw"
        // className=" bg-[#F1E1C2]"
        style={{
          // overflow: "auto",
          position: "fixed",
          height: "110vh",
          paddingBottom: "60px",
          // overflowX: "hidden",
          zIndex: 2,
          backgroundColor: "#FBF5EB",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
            width: "100%",
            // height: 60,
            padding: "0 0 20px 0",
          }}
        >
          <Link to="/">
            <img src={Logo} height="30px" />
          </Link>
        </div>

        {/* <div
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={LogoText} height="50px" width="50%" />
        </div> */}

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
            height: "90%",
            marginTop: 0,
          }}
        >
          {linkItems.map((item, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                position: "relative",
                paddingLeft: "40px",
              }}
            >
              {item.option ? (
                <Link
                  to={item.path}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() => {
                      setSetting(!setting);
                    }}
                    style={{
                      display: "flex",

                      color: "black",
                      alignItems: "flex-end",
                      margin: "auto  0 auto 0",
                      gap: "14px",
                      background: setting ? "#DBB162" : "none",
                      width: "100%",
                      padding: "10px 10px",
                      // borderRadius: "100px 0px 0px 100px",
                    }}
                  >
                    <div style={{ height: "24px" }}>{item.icon}</div>
                    <div
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        height: "fit-content",
                      }}
                    >
                      {item.title}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      // marginTop: setting ? "5px" : 0,
                      // marginBottom: "-7px",
                    }}
                  >
                    {setting &&
                      item.optionsItems.map((optionItem, optionIndex) => (
                        <Link
                          to={optionItem.path}
                          key={optionIndex}
                          style={{
                            // width: "150px",
                            height: "40px",
                            // borderRadius: "0 10px 10px 0",
                            width: "100%",
                          }}
                        >
                          <Link
                            className="text-center"
                            to={optionItem.path}
                            style={{
                              display: "flex",

                              color: "Black",
                              alignItems: "flex-end",

                              // borderRadius: "100px 0px 0px 100px",
                            }}
                          >
                            <div
                              className="  mx-auto "
                              style={{
                                fontSize: "14px",
                                marginBottom: "5px",
                                background:
                                  optionItem.path === pathname
                                    ? "#D0D2CE"
                                    : "white",
                                height: "fit-content",

                                marginTop: "10px",
                                width: "100%",
                                padding: "7px 7px",
                              }}
                            >
                              {optionItem.title}
                            </div>
                          </Link>
                        </Link>
                      ))}
                  </div>
                </Link>
              ) : (
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    color: item.path === pathname ? "white" : "Black",
                    alignItems: "flex-end",
                    margin: "auto  0 auto 0",
                    gap: "14px",
                    background: item.path === pathname ? "#DBB162" : "none",
                    width: "100%",
                    padding: "6px 6px",
                    // borderRadius: "100px 0px 0px 100px",
                  }}
                >
                  <div style={{ height: "24px" }}>{item.icon}</div>
                  <div
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      height: "fit-content",
                    }}
                  >
                    {item.title}
                  </div>
                </Link>
              )}
            </li>
          ))}

          <li
            onClick={handleLogOut}
            style={{
              width: "100%",
              display: "flex",
              cursor: "pointer",
              gap: "15px",
              paddingLeft: "45px",
            }}
          >
            <div style={{ height: "24px" }}>
              <FiLogOut size={24} />
            </div>
            <div
              style={{
                fontSize: "14px",
                textAlign: "center",
                height: "fit-content",
              }}
            >
              Log out
            </div>
          </li>
        </ul>
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            height: "80px",
            zIndex: 1,
            padding: 0,
            backgroundColor: "#FBF5EB",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "75px",
            paddingLeft: "17vw",
          }}
        >
          <div
            style={{
              width: "220px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/notification">
              <div
                style={{
                  background: "#F2F2F2",
                  width: 45,
                  height: 45,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <RiNotification2Line color="black" size={19} />

                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: "#F8EC41",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#6A5ECC",
                    position: "absolute",
                    top: 8,
                    right: 10,
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  5
                </div>
              </div>
            </Link>
            <Link
              to={"/admin-profile"}
              style={{
                height: "42px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px",
              }}
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_API_URL}/${user?.avatar}`}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  borderColor: "#DBB162",
                  borderWidth: 2,
                }}
                alt=""
              />
              <h2
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: 200,
                }}
              >
                {user ? user?.fullName : "Anonymous"}
              </h2>
            </Link>
          </div>
        </Header>

        <Content
          style={{
            marginTop: "95px",
            // marginBottom: "20px",
            marginLeft: "16%",
            marginRight: "10px",

            overflow: "auto",
            // padding: "20px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
