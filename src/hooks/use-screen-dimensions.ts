import { useState, useLayoutEffect } from "react";
import { isWidthGroupsDifferences } from "../utils/gallery.utils";
import { ScreenWidthSizes } from "../gallery.types";
import { screenWidthSizes } from "../constants/responsive";

const useScreenDimensions = (
  userScreenWidthValues: ScreenWidthSizes = screenWidthSizes
) => {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setWidth((oldWidth) => {
        if (
          isWidthGroupsDifferences(
            window.innerWidth,
            oldWidth,
            userScreenWidthValues
          )
        ) {
          return window.innerWidth;
        }
        return oldWidth;
      });
    };
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [userScreenWidthValues]);

  return { width };
};

export default useScreenDimensions;
