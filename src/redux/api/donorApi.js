import { baseApi } from "./baseApi";

export const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDonor: build.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["Donor"],
    }),
  }),
});

export const { useGetDonorQuery } = donorApi;
