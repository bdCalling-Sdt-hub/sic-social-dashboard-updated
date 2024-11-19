import { baseApi } from "./baseApi";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFeedBack: build.query({
      query: () => ({
        url: "/feedbacks",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),
    addFeedBack: build.mutation({
      query: (data) => ({
        url: "/feedbacks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),
    updateFeedBack: build.mutation({
      query: (args) => {
        return {
          url: `/feedbacks/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Feedback"],
    }),
    deleteFeedBack: build.mutation({
      query: (id) => {
        return {
          url: `/feedbacks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedBackQuery,
  useAddFeedBackMutation,
  useUpdateFeedBackMutation,
  useDeleteFeedBackMutation,
} = feedbackApi;
