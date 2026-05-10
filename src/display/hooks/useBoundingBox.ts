import { useEffect, useState } from "react";

export const useBBox = (ref: React.RefObject<SVGGElement | null>) => {
  const [bbox, setBBox] = useState<DOMRect | null>(null);
  //console.log(`called on ${item.name}`)

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setBBox(ref.current.getBBox({fill: true, stroke: true}))
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    }
    
  }, [ref]);

  return bbox;
};