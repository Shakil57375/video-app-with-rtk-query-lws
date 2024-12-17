import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // Ensure this URL is correct and server is running
  }),
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
      providesTags: ["Videos"]
    }),
    getVideo: builder.query({
      query: (videoId) => ({
        url: `/videos/${videoId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    getRelatedVideo: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`)
        const queryString = `/videos?${likes.join("&")}`
        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

// export
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = apiSlice;
