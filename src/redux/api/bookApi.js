import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    addBook: build.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: build.mutation({
      query: (args) => {
        console.log(args, "args from base api");
        return {
          url: `/books/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Book"],
    }),
    deleteBook: build.mutation({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
