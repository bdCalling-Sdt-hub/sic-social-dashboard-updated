// import { Button, Checkbox, Form, Input } from "antd";
// import React from "react";
// import { useNavigate } from "react-router";

// import "./style.css";
// const Register = () => {
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);

//     const register
//   };

//   const navigate = useNavigate();

//   return (
//     <div
//       className="   "
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",

//         height: "100vh",
//       }}
//     >
//       <div className="bgImg"></div>
//       <div
//         style={
//           {
//             // position: "relative",
//           }
//         }
//       >
//         <Form
//           name="normal_login"
//           className="login-form backdrop-blur-lg bg-white/70"
//           initialValues={{
//             remember: true,
//           }}
//           style={{
//             width: "630px",

//             borderRadius: "12px",
//             padding: "90px 57px",
//             position: "relative",
//             zIndex: 100,
//           }}
//           onFinish={onFinish}
//         >
//           <h1
//             style={{
//               fontSize: "32px",
//               color: "black",
//               textAlign: "center",
//               fontWeight: 500,
//             }}
//           >
//             Register Your Account
//           </h1>
//           <p className="text-lg py-6 text-center">
//             Please enter information to continue
//           </p>

//           {/* fullName */}
//           <div style={{ marginBottom: "24px" }}>
//             <label
//               htmlFor="fullName"
//               style={{ display: "block", marginBottom: "5px" }}
//             >
//               Full Name
//             </label>
//             <Form.Item
//               style={{ marginBottom: 0 }}
//               name="fullName"
//               id="fullName"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your full name!",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="Enter your email address"
//                 type="text"
//                 style={{
//                   border: "1px solid #E0E4EC",
//                   height: "52px",
//                   background: "white",
//                   borderRadius: "8px",
//                   outline: "none",
//                 }}
//               />
//             </Form.Item>
//           </div>
//           <div style={{ marginBottom: "24px" }}>
//             <label
//               htmlFor="email"
//               style={{ display: "block", marginBottom: "5px" }}
//             >
//               Email
//             </label>
//             <Form.Item
//               style={{ marginBottom: 0 }}
//               name="email"
//               id="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your email!",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="Enter your email address"
//                 type="email"
//                 style={{
//                   border: "1px solid #E0E4EC",
//                   height: "52px",
//                   background: "white",
//                   borderRadius: "8px",
//                   outline: "none",
//                 }}
//               />
//             </Form.Item>
//           </div>

//           <div style={{ marginBottom: "24px" }}>
//             <label
//               style={{ display: "block", marginBottom: "5px" }}
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <Form.Item
//               style={{ marginBottom: 0 }}
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your Password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 type="password"
//                 placeholder="Enter your password"
//                 style={{
//                   border: "1px solid #E0E4EC",
//                   height: "52px",
//                   background: "white",
//                   borderRadius: "8px",
//                   outline: "none",
//                 }}
//               />
//             </Form.Item>
//           </div>
//           <div style={{ marginBottom: "24px" }}>
//             <label
//               style={{ display: "block", marginBottom: "5px" }}
//               htmlFor="phoneNumber"
//             >
//               Phone Number
//             </label>
//             <Form.Item
//               style={{ marginBottom: 0 }}
//               name="phoneNumber"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your phone number!",
//                 },
//               ]}
//             >
//               <Input
//                 type="number"
//                 placeholder="Enter your phone number"
//                 style={{
//                   border: "1px solid #E0E4EC",
//                   height: "52px",
//                   background: "white",
//                   borderRadius: "8px",
//                   outline: "none",
//                 }}
//               />
//             </Form.Item>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox style={{ color: "black", fontSize: "16px" }}>
//                 Remember me
//               </Checkbox>
//             </Form.Item>
//             <a
//               className="login-form-forgot"
//               style={{ color: "#D93D04", fontWeight: "bold", fontSize: "16px" }}
//               href="/forgot-password"
//             >
//               Forgot password
//             </a>
//           </div>

//           <Form.Item style={{ marginBottom: 0 }}>
//             <Button
//               //   onClick={() => navigate("/")}
//               type="primary"
//               htmlType="submit"
//               className="login-form-button"
//               block
//               style={{
//                 height: "52px",
//                 fontWeight: "400px",
//                 fontSize: "18px",
//                 background: "#F27405",
//                 marginTop: "56px",
//               }}
//             >
//               Sign Up
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Register;
