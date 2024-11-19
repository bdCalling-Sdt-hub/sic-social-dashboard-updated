import { Modal } from "antd";
import React from "react";
import { FaInstagram } from "react-icons/fa6";

const UserDetailsModal = ({ open, setOpen }) => {
  const interest = ["friend ", "family", "career", "animal"];
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={false}
      width={600}
    >
      <div className="p-6">
        <div className=" grid grid-cols-4 gap-4">
          {/*  image  */}
          <div className=" py-5 col-span-1">
            <img
              className="w-20 h-20 rounded-full"
              src="https://i.ibb.co/B2xfD8H/images.png"
              alt=""
            />
          </div>
          {/* others data  */}
          <div className=" col-span-3 flex flex-col justify-start items-start gap-3 pe-4">
            <div>
              <p className=" text-lg font-semibold">Naziya Sultana Mithila</p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <p className="text-sm  mb-1 w-1/3">Email :</p>
              <p className=" text-sm  w-2/3">mithila@gmail.com</p>
            </div>
            <div className="flex gap-2 w-full">
              <p className="text-sm  mb-1  w-1/3">Contact no</p>
              <p className=" text-sm  w-2/3">+8764895678</p>
            </div>
            <div className="flex items-center gap-2 w-full ">
              <p className="text-sm  mb-1 w-1/3">Lives in</p>
              <p className=" text-sm  w-2/3">Bangladesh</p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <p className="text-sm  mb-1 w-1/3">Works at </p>
              <p className=" text-sm  w-2/3">sgf</p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <p className="text-sm  mb-1 w-1/3">Studied at </p>
              <p className=" text-sm  w-2/3">DMPI</p>
            </div>

            <div className=" border border-[#e0d9d1] rounded-lg">
              <p className=" flex gap-2 py-2 px-2 items-center ">
                {" "}
                <span>
                  {" "}
                  <FaInstagram size={24} />{" "}
                </span>
                <span> https://www.instagram.com/as.ad1679... </span>{" "}
              </p>
            </div>

            {/* interest  */}
            <p className="text-[#767676] font-semibold pt-2">Interest</p>
            <div className="flex gap-3">
              {interest?.map((value, index) => (
                <button
                  key={index}
                  className="bg-[#FBF5EB] text-black  px-2 py-1 rounded-lg"
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Bio  */}
            <div>
              <p className="text-[#767676] font-semibold pt-2">Bio</p>
              <p className="text-[#767676] text-sm ">
                scelerisque Praesent Donec amet, eget lorem. consectetur id
                varius at, nec nec dolor quam amet, tincidunt quis vitae In Ut
                laoreet
              </p>
            </div>

            {/* report history  */}
            <div className="w-full">
              <p className=" text-[#767676] font-semibold py-2">
                Reports history
              </p>
              <div className=" w-full bg-[#F1F1F1] p-5 rounded-lg">
                <p className="text-[#767676]">
                  1. <span className="text-red-400"> reson 1</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
