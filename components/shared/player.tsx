import MuxPlayer from "@mux/mux-player-react/lazy";
import { Card } from "../ui/card";

interface PlayerProps {
  service: string | "YT" | "YouTube" | "MUX";
  videoId: string;
  title: string;
}

export function Player({ service, title, videoId }: PlayerProps) {
  switch (service) {
    case "YouTube":
    case "YT":
      return <YouTubePlayer videoId={videoId} title={title} />;
    case "MUX":
      return <MuxPlayerRender videoId={videoId} title={title} />;
    default:
      return <VideoNotFound />; // TODO: return a not found video message
  }
}

function MuxPlayerRender({
  title,
  videoId,
}: {
  title: string;
  videoId: string;
}) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={videoId}
      title={title}
      placeholder={`https://image.mux.com/${videoId}/thumbnail.jpg?width=1920&height=1080&fit_mode=pad`}
      metadata={{
        videoTitle: { title },
        poster: `https://image.mux.com/${videoId}/thumbnail.jpg?width=1920&height=1080&fit_mode=pad`,
      }}
      primaryColor="#FFFFFF"
      secondaryColor="#000000"
      accentColor="#27B7B7"
      style={{ aspectRatio: "16:9" }}
    />
  );
}

function YouTubePlayer({ title, videoId }: { title: string; videoId: string }) {
  return (
    <iframe
      width="720"
      height="405"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      style={{ aspectRatio: "16:9", border: "none" }}
      className="w-full"
    />
  );
}

function VideoNotFound() {
  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold">Video not found</h1>
      <p>Sorry, the video you are looking for is not available.</p>
    </Card>
  );
}
