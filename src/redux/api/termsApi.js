import { baseApi } from "./baseApi";

export const termsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: () => ({
        url: "/terms-and-conditions",
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),
    addTerms: build.mutation({
      query: (data) => ({
        url: "/terms-and-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    updateTerms: build.mutation({
      query: (args) => {
        return {
          url: `terms-and-conditions/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const { useGetTermsQuery, useAddTermsMutation, useUpdateTermsMutation } =
  termsApi;
