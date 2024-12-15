import { useGetVideosQuery } from "../../features/api/apiSlice.js";
import Error from "../ui/Error.jsx";
import VideoLoader from "../ui/loaders/VideoLoader.jsx";
import Video from "./Video.jsx";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to load
  let content = null;
  if (isLoading) {
    content = (
      <div>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </div>
    );
  }

  if (isLoading && isError) {
    content = (
      <div>
        <Error />
      </div>
    );
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <div>
        <Error message="there was an error" />
      </div>
    );
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content
}
