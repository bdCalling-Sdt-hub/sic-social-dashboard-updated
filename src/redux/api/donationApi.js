import { baseApi } from "./baseApi";

export const donationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDonation: build.query({
      query: () => ({
        url: "/donations",
        method: "GET",
      }),
      providesTags: ["Donation"],
    }),
    addDonation: build.mutation({
      query: (data) => ({
        url: "/donations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Donation"],
    }),
    updateDonation: build.mutation({
      query: (args) => {
        return {
          url: `/donations/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Donation"],
    }),
    // deleteDonation: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/donations/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["Donation"],
    // }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonationQuery,
  useUpdateDonationMutation,
} = donationApi;
