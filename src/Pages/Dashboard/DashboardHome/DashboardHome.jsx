import React from "react";

import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { HiMiniUserGroup } from "react-icons/hi2";
import TotalEarningGoth from "./TotalEarningGrowth";
import doner from "../../../assets/doner.png";
import donation from "../../../assets/donation.png";
import { useGetDashboardMatrixQuery } from "../../../redux/api/dashboardApi";

function DashboardHome() {
  const { data: dashboardMatrix, isFetching } = useGetDashboardMatrixQuery({});
  // console.log(dashboardMatrix);
  // const onChange = (pageNumber) => {
  //   console.log("Page: ", pageNumber);
  // };

  if (isFetching) return <div>Loading...</div>;

  // Destructure the data from dashboardMatrix
  const {
    totalUser = 0,
    todayUser = 0,
    totalDoner = 0,
    todayDoner = 0,
    totalDonation = 0,
    todayDonation = 0,
  } = dashboardMatrix?.data || {};

  // Prepare the data array using the values from dashboardMatrix
  const data = [
    {
      name: "Total User",
      count: `${totalUser.toLocaleString()}`, // Convert to string with commas
      title1: "Daily user",
      total: todayUser,
      icon: <HiMiniUserGroup color="#DBB162" size={24} />,
      bgColor: "#EFEFEF",
      textColor: "#DBB162",
    },
    {
      name: "Total Donor",
      count: `${totalDoner.toLocaleString()}`,
      title1: "Daily Donor",
      total: todayDoner,
      icon: <img src={doner} alt="Doner Icon" />,
      textColor: "#8E3C50",
      bgColor: "#EFEFEF",
    },
    {
      name: "Total Earning",
      count: `$${totalDonation.toLocaleString()}`,
      title1: "Daily Donation",
      total: `$${todayDonation}`,
      icon: <img src={donation} alt="Donation Icon" />,
      textColor: "#F16365",
      bgColor: "#EFEFEF",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 items-center mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-10 "
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: `${item.bgColor}`,
                width: "44px",
                height: "44px",
                borderRadius: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item?.icon}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: "1.2em",
                  fontWeight: "400",
                  color: "#6A6D7C",
                }}
              >
                {item.name}
              </p>
              <div>
                <p
                  style={{
                    fontSize: "1.6em",
                    fontWeight: "600",
                    color: `${item?.textColor}`,
                  }}
                >
                  {item.count}
                </p>

                <p className="flex gap-3 items-center text-[#00B047] font-medium text-lg">
                  <span> {item?.title1} </span> <span> {item?.total}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className=" mt-[20px]"
        style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          width: "100%",
          height: "450px",
          padding: "10px 20px 20px 20px",
        }}
      >
        <TotalEarningGoth />
      </div>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "15px",
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "20px",
        }}
      >
        <div
          className="bg-black"
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            width: "100%",
            height: "370px",
            padding: "10px 20px 20px 20px",
          }}
        >
          <DailyOverviewChart />
        </div>
        <div
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            width: "100%",
            height: "370px",
            padding: "10px 20px 20px 20px",
          }}
        >
          <TotalSellerChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
