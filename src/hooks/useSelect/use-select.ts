import { useEffect, useState } from "react";
import { getSelectedImages } from "../../utils/gallery.utils";

const useSelect = () => {
  const [data, setData] = useState<string[] | []>([]);

  useEffect(() => {
    setData(getSelectedImages());
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".select-input");
    elements.forEach((element) => {
      element.addEventListener("change", (e: Event) => {
        const val = (e.target as HTMLInputElement)?.checked;
        const id = (e.target as HTMLInputElement).value;

        setData((prev) => {
          const nData = [...prev];
          if (val) {
            nData.push(id);
          } else {
            nData.splice(nData.indexOf(id), 1);
          }
          return nData;
        });
      });
    });
  }, []);
  return data;
};

export { useSelect };
