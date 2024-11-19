import { baseApi } from "./baseApi";

export const guideLineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGuideline: build.query({
      query: () => ({
        url: "/sic-guidelines",
        method: "GET",
      }),
      providesTags: ["GuideLine"],
    }),
    addGuideline: build.mutation({
      query: (data) => ({
        url: "/sic-guidelines",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GuideLine"],
    }),
    updateGuideline: build.mutation({
      query: (args) => {
        return {
          url: `sic-guidelines/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["GuideLine"],
    }),
  }),
});

export const {
  useAddGuidelineMutation,
  useGetGuidelineQuery,
  useUpdateGuidelineMutation,
} = guideLineApi;
