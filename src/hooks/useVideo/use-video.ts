import { useState, useEffect, useRef } from "react";

export const useVideo = (videoSrc: string) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);

    const videoElement = document.createElement("video");

    const handleCanPlay = () => {
      setLoaded(true);
    };

    const handleError = () => {
      setError(true);
    };

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    videoElement.src = videoSrc;
    videoElement.load();

    videoRef.current = videoElement;

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
    };
  }, [videoSrc]);

  return { loaded, error, videoRef };
};
