import { baseApi } from "./baseApi";

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
      providesTags: ["Privacy-Policy"],
    }),
    addPrivacyPolicy: build.mutation({
      query: (data) => ({
        url: "/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Privacy-Policy"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: (args) => {
        return {
          url: `privacy-policy/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Privacy-Policy"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} = privacyPolicyApi;
