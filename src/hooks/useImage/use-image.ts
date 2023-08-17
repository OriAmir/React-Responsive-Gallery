import { useState, useLayoutEffect } from "react";

export const useImage = (
  src: string,
): [boolean, boolean, HTMLImageElement | undefined] => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement>();

  useLayoutEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImage(image);
      setLoaded(true);
    };

    image.onerror = () => {
      setError(true);
    };

    image.src = src;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return [loaded, error, image];
};
