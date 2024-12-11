import { baseApi } from './baseApi';

export const donationApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getDonation: build.query({
                  query: () => ({
                        url: '/donations',
                        method: 'GET',
                  }),
                  providesTags: ['Donation'],
            }),
            addDonation: build.mutation({
                  query: (data) => ({
                        url: '/donations',
                        method: 'POST',
                        body: data,
                  }),
                  invalidatesTags: ['Donation'],
            }),
      }),
});

export const { useAddDonationMutation, useGetDonationQuery, useUpdateDonationMutation } = donationApi;
