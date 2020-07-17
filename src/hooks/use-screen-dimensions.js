import { useState, useLayoutEffect } from "react";
import { isWidthGroupsDifferents } from "../utils/gallery";

const useScreenDimensions = (userScreenWidthValues) => {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setWidth((oldWidth) => {
        if (
          isWidthGroupsDifferents(
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
