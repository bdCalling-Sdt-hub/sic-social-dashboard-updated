import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query({
      query: () => ({
        url: "/about-sic",
        method: "GET",
      }),
      providesTags: ["About"],
    }),
    addAbout: build.mutation({
      query: (data) => ({
        url: "/about-sic",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["About"],
    }),
    updateAbout: build.mutation({
      query: (args) => {
        return {
          url: `/about-sic/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["About"],
    }),
  }),
});

export const { useGetAboutQuery, useAddAboutMutation, useUpdateAboutMutation } =
  aboutApi;
