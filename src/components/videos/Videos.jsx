import { useGetVideosQuery } from "../../features/api/apiSlice.js";
import Error from "../ui/Error.jsx";
import VideoLoader from "../ui/loaders/VideoLoader.jsx";
import Video from "./Video.jsx";

export default function Videos() {
  // Fetching data with a custom hook
  const { data: videos, isLoading, isError,  } = useGetVideosQuery();

  // Debugging to see what data is fetched
  console.log('Fetched videos:', videos);
  console.log('Loading:', isLoading, 'Error:', isError);

  // Render loading skeleton if the data is still being loaded
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(7)].map((_, index) => (
          <VideoLoader key={index} />
        ))}
      </div>
    );
  }

  // Render error component if an error occurs while fetching data
  if (isError) {
    return (
      <div>
        <Error message="Something went wrong while fetching videos." />
      </div>
    );
  }

  // Render a message if no videos are found
  if (videos?.length === 0) {
    return (
      <div>
        <Error message="No videos found." />
      </div>
    );
  }

  // Render the list of videos if available
  if (videos?.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    );
  }

  return null;
}
