import { baseApi } from "./baseApi";

export const bookCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBookCategory: build.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    addBookCategory: build.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateBookCategory: build.mutation({
      query: (args) => {
        console.log(args, "args from base api");
        return {
          url: `/categories/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteBookCategory: build.mutation({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetBookCategoryQuery,
  useAddBookCategoryMutation,
  useDeleteBookCategoryMutation,
  useUpdateBookCategoryMutation,
} = bookCategoryApi;
