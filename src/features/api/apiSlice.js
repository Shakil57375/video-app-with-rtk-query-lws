import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000", // Ensure this URL is correct and server is running
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos", // This should fetch from http://localhost:9000/videos
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
  }),
});

// export
export const { useGetVideosQuery, useGetVideoQuery } = apiSlice;
