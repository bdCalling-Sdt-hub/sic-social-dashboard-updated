import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserProfile: build.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // createUser: build.mutation({
    //   query: (data) => ({
    //     url: "/users/create-user",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    updateUserStatus: build.mutation({
      query: (args) => {
        return {
          url: `/users/update-status/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUserProfile: build.mutation({
      query: (data) => {
        return {
          url: `/users/update-profile`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUserProfileImage: build.mutation({
      query: (data) => {
        return {
          url: `/users/update-profile`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserStatusMutation,
  useUpdateUserProfileImageMutation,
} = userApi;
