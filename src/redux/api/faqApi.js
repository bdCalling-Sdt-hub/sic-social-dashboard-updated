import { baseApi } from "./baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    addFaq: build.mutation({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: build.mutation({
      query: (args) => {
        return {
          url: `/faqs/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: build.mutation({
      query: (args) => {
        return {
          url: `/faqs/${args.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
