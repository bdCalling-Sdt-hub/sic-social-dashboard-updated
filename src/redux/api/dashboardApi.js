import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardMatrix: build.query({
      query: () => ({
        url: "/dashboard/metrics",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getUserStats: build.query({
      query: (year) => ({
        url: `/dashboard/user-count/${year}`,
        // /dashboard/user-count/2024
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getDonorStats: build.query({
      query: (year) => ({
        url: `/dashboard/doners-count/${year}`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getDonationAmountStats: build.query({
      query: (year) => ({
        url: `/dashboard/donation-amount/${year}`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardMatrixQuery,
  useGetUserStatsQuery,
  useGetDonorStatsQuery,
  useGetDonationAmountStatsQuery,
} = dashboardApi;
