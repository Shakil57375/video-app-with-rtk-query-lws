import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // Ensure this URL is correct and server is running
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos", // This should fetch from http://localhost:9000/videos
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    getRelatedVideo: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`)
        const queryString = `/videos?${likes.join("&")}`
        return queryString;
      }
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
    })
  }),
});

// export
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideoQuery, useAddVideoMutation } = apiSlice;
