import React, { useState } from "react";
import { Tabs } from "antd";
import Details from "../../Components/Dashboard/UploadDonation/Details";
import Rules from "../../Components/Dashboard/UploadDonation/Rules";
import DonationTerms from "../../Components/Dashboard/UploadDonation/DonationTerms";
import {
  useAddDonationMutation,
  useGetDonationQuery,
  useUpdateDonationMutation,
} from "../../redux/api/donationApi";
import { toast } from "sonner";

const UploadDonation = () => {
  const [addDonation] = useAddDonationMutation();
  const [updateDonation] = useUpdateDonationMutation();
  const { data: donationData } = useGetDonationQuery({});

  // console.log(donation);

  const [activeTab, setActiveTab] = useState("1");
  const [detailsData, setDetailsData] = useState({});
  const [rulesData, setRulesData] = useState("");
  const [termsData, setTermsData] = useState("");

  // submit donation information

  const handleSubmitAllData = async (type) => {
    const formData = new FormData();
    const data = {
      details: {
        title: detailsData.title,
        content: detailsData.content,
      },
      rulesAndRegulations: {
        content: rulesData,
      },
      termsAndConditions: {
        content: termsData,
      },
    };

    formData.append("data", JSON.stringify(data));
    formData.append("image", detailsData.image);

    if (type == "add") {
      try {
        const res = await addDonation(formData).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      } catch (error) {}
    }
    if (type == "update") {
      console.log("click update");
      console.log(data);
      const updateData = {
        data: formData,
        id: donationData?.data[0]._id,
      };
      try {
        const res = await updateDonation(updateData).unwrap();

        if (res.success) {
          toast.success(res.message);
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <p className="px-4">Details </p>,
      children: (
        <Details setActiveTab={setActiveTab} setDetailsData={setDetailsData} />
      ),
    },
    {
      key: "2",
      label: <p className="px-4">Rules & Regulations </p>,
      children: (
        <Rules setActiveTab={setActiveTab} setRulesData={setRulesData} />
      ),
    },
    {
      key: "3",
      label: <p className="px-4">Terms & Conditions </p>,
      children: (
        <DonationTerms
          setActiveTab={setActiveTab}
          handleSubmitAllData={handleSubmitAllData}
          setTermsData={setTermsData}
          donationData={donationData}
          termsData={termsData}
        />
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg p-10">
      <div>
        <h3
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          All Donation details
        </h3>
      </div>
      <div className=" mt-[30px]">
        <Tabs
          activeKey={activeTab}
          items={items}
          // onChange={onChange}
          type="line"
        />
      </div>
    </div>
  );
};

export default UploadDonation;
