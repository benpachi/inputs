import { useEffect, useState } from "react";
import type { CanvasItem } from "../../types/canvas-item";

export const useBBox = (ref: React.RefObject<SVGGElement | null>, item: CanvasItem) => {
  const [bbox, setBBox] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (ref.current) {
      setBBox(ref.current.getBBox({fill: false, stroke: true}));
    }
  }, [ref, item]);

  return bbox;
};