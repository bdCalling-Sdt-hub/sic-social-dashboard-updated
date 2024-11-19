import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/api/authApi";
const UpdatePassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [err, setErr] = useState("");
  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password did not match!!!");
    }
    if (newPassword.length < 6) {
      toast.error("Password can be less then 6 digit !!!");
    }
    const resetPasswordInfo = {
      email: JSON.parse(localStorage.getItem("email")),
      newPassword,
    };
    try {
      const res = await fetch(
        "http://192.168.10.18:5010/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },

          body: JSON.stringify(resetPasswordInfo),
        }
      );
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Successfully",
          text: "Your password has been updated, please change your password regularly to avoid this happening",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Confirm",
          confirmButtonColor: "#F27405",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!!");
    }
  };

  return (
    <div
      style={{
        width: "100%",

        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bgImg"></div>
      <div>
        <Form
          name="normal_login"
          className="login-form  backdrop-blur-lg bg-white/70"
          initialValues={{
            remember: true,
          }}
          style={{
            width: "630px",

            borderRadius: "12px",
            padding: "90px 57px",
          }}
          onFinish={onFinish}
        >
          <h1
            style={{
              fontSize: "32px",
              color: "black",
              marginBottom: "13px",
              textAlign: "center",
            }}
          >
            Set a new password
          </h1>
          <p
            style={{
              width: "350px",
              color: "#5C5C5C",
              fontSize: "14px",
              fontWeight: 400,
              margin: "0 auto 0 auto",
              textAlign: "center",
            }}
          >
            Create a new password. Ensure it differs from previous ones for
            security
          </p>

          <div style={{ margin: "45px 0 20px 0" }}>
            <label
              style={{
                display: "block",
                color: "#5C5C5C",
                marginBottom: "5px",
              }}
              className="font-semibold"
              htmlFor=""
            >
              New Password
            </label>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
            {newPassError && (
              <label style={{ display: "block", color: "red" }} htmlFor="error">
                {newPassError}
              </label>
            )}
          </div>

          <div style={{ marginBottom: "40px" }}>
            <label
              style={{
                display: "block",
                color: "#5C5C5C",
                marginBottom: "5px",
              }}
              htmlFor="email"
              className="font-semibold"
            >
              Confirm Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter Confirm password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
            {conPassError && (
              <label style={{ display: "block", color: "red" }} htmlFor="error">
                {conPassError}
              </label>
            )}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                border: "none",
                height: "51px",
                background: "#F27405",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                marginTop: "",
              }}
            >
              UPDATE PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
