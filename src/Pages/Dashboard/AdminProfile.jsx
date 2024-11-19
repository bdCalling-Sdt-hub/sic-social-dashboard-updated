import { useState } from "react";
import { Button, Form, Input } from "antd";

import { CiEdit } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileImageMutation,
  useUpdateUserProfileMutation,
} from "../../redux/api/userApi";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../redux/api/authApi";
const AdminProfile = () => {
  const { data, isFetching } = useGetUserProfileQuery({});

  const user = data?.data;
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateUserProfileImage] = useUpdateUserProfileImageMutation();
  const [changePassword] = useChangePasswordMutation();
  const [isEdit, setIsEdit] = useState(true);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [address, setAddress] = useState(user?.address || "");
  const [contact, setContact] = useState(user?.phoneNumber || "");

  const [imgPick, setImagePick] = useState(null);

  const onImageChange = async (event) => {
    const image = event.target.files[0];
    if (event.target.files[0]) {
      setImagePick(URL.createObjectURL(event.target.files[0]));
    }

    if (image) {
      const formData = new FormData();
      formData.append("avatar", image);
      formData.append("data", JSON.stringify({}));
      try {
        try {
          const res = await updateUserProfileImage(formData).unwrap();
          // console.log(res);
          if (res.success) {
            toast.success(res.message);
          }
        } catch (error) {
          toast.error(
            error.data.message || "Something went wrong while change image!!!"
          );
        }
      } catch (error) {}
    }
  };

  const handleChangePassword = async (values) => {
    console.log(values.currentPassword, values.confirmPassword);
    if (values.newPassword !== values.confirmPassword) {
      return toast.error("Confirm Password must same as current password!!!");
    }

    try {
      const res = await changePassword(values).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        error.data.message || "Something went wrong while change password!!!"
      );
    }
  };

  // const handleReset = () => {
  //   window.location.reload();
  // };
  const handleUpdateProfile = async () => {
    if (!fullName || !address || !contact) {
      toast.error("Please fill in all required fields.");
      return; // Exit the function if validation fails
    }
    const formData = new FormData();
    // console.log({ fullName, address, contact });
    const updatedData = { fullName, address, contact };
    formData.append("data", JSON.stringify(updatedData));
    try {
      const res = await updateUserProfile(formData).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        error.data.message || "Something went wrong while update profile!!!"
      );
    }
  };
  // console.log(`http://192.168.10.18:5010/${user?.avatar}`);
  console.log(user);
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
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0",
          }}
        >
          <div>
            <h3
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Admin Profile
            </h3>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          ></div>
        </div>

        <div>
          <div className="flex justify-center items-center">
            <div
              className=" w-[75%] bg-[#F9F9F9] rounded-lg py-5"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  // src={imgPick ? imgPick : Logo}
                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${user?.avatar}`}
                  alt="User Avatar"
                  style={{
                    height: 114,
                    width: 119,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: -10,
                    backgroundColor: "white",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <CiEdit size={25} color="#929394" />
                </label>
              </div>
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                {user ? user?.fullName : "Anonymous"}
              </p>
            </div>
          </div>

          <input
            id="imageUpload"
            type="file"
            onChange={onImageChange}
            style={{ display: "none" }}
            alt=""
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35,
              marginBottom: 35,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 33,
              }}
            >
              <p
                onClick={() => setIsEdit(true)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#DBB162" : "#818181",
                  cursor: "pointer",
                  borderBottom: isEdit ? "3px solid #DBB162" : "none",
                  padding: "6px 0px",
                }}
              >
                Edit Profile
              </p>
              <p
                onClick={() => setIsEdit(false)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#818181" : "#DBB162",
                  cursor: "pointer",
                  borderBottom: isEdit ? "none" : "3px solid #DBB162",
                  padding: "6px 0px",
                }}
              >
                Change Password
              </p>
            </div>
          </div>
          {isEdit ? (
            <div className="flex justify-center items-center">
              <div
                className=" bg-[#F9F9F9] w-[75%]"
                style={{
                  padding: "40px",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  Edit Your Profile
                </p>

                <div>
                  <div className=" flex justify-center items-center">
                    <div
                      style={{
                        marginTop: 25,
                        width: "65%",
                      }}
                    >
                      <div className=" mb-3">
                        <label
                          style={{
                            color: "#636363",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          User Name
                        </label>
                        <Input
                          onChange={(e) => setFullName(e.target.value)}
                          name="fullName"
                          // placeholder="Admin Marie"
                          defaultValue={user?.fullName}
                          style={{
                            padding: "10px",
                            color: "#818181",
                            fontSize: 14,
                            fontWeight: 400,
                            margin: "8px 0px",
                          }}
                        />
                      </div>

                      <div className=" mb-3">
                        <label
                          style={{
                            color: "#636363",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          Contact no
                        </label>
                        <Input
                          onChange={(e) => setContact(e.target.value)}
                          name="contactNumber"
                          value={contact} // Controlled input value
                          placeholder="+99007007007"
                          style={{
                            padding: "10px",
                            color: "#818181",
                            fontSize: 14,
                            fontWeight: 400,
                            margin: "8px 0px",
                          }}
                        />
                      </div>
                      <div className=" mb-3">
                        <label
                          style={{
                            color: "#636363",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          Address
                        </label>
                        <Input
                          onChange={(e) => setAddress(e.target.value)}
                          name="address"
                          defaultValue={user?.address}
                          placeholder="79/A Joker Vila, Gotham City"
                          style={{
                            padding: "10px",
                            color: "#818181",
                            fontSize: 14,
                            fontWeight: 400,
                            margin: "8px 0px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={handleUpdateProfile}
                      htmlType="submit"
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
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center">
              <div
                className=" bg-[#F9F9F9] w-[75%] p-[40px] rounded-lg"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  style={{ width: "65%", height: "fit-content" }}
                  onFinish={handleChangePassword}
                >
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: "#333333",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Change Password
                  </p>

                  <div style={{ marginBottom: "30px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      Current Password
                    </label>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          min: 6,
                          message:
                            "Current password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      New Password
                    </label>
                    <Form.Item
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          min: 6,
                          message: "New password must be at least 6 characters",
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input.Password
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: "40px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      Re-Type Password
                    </label>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          min: 6,
                          message:
                            "Confirm your password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          marginTop: 24,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
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
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
