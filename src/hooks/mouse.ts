import { useEffect, useRef } from "react";

type UseMouseCallback = (x: number, y: number) => void;
export type UseMouseOptions = {
  onMouseDown: UseMouseCallback;
  onMouseUp: UseMouseCallback;
  onMouseMove: UseMouseCallback;
}

export default function useMouse(
  nodeRef: React.MutableRefObject<HTMLDivElement | null>,
  options: UseMouseOptions,
) {
  const modeRef = useRef(false);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const { offsetX: x, offsetY: y } = e;
      switch (e.type) {
        case 'mouseup':
          if (modeRef.current) {
            options.onMouseUp(x, y);
            modeRef.current = false;
          }
          break;
        case 'mousedown':
          if (!modeRef.current) {
            options.onMouseDown(x, y);
            modeRef.current = true;
          }
          break;
        case 'mousemove':
          if (modeRef.current) {
            options.onMouseMove(x, y);
          }
          break;
      }
      e.stopPropagation();
      e.preventDefault();
    }
    const node = nodeRef.current;
    node?.addEventListener('mousedown', onMouse);
    node?.addEventListener('mouseup', onMouse);
    node?.addEventListener('mousemove', onMouse);

    return () => {
      node?.removeEventListener('mousedown', onMouse);
      node?.removeEventListener('mouseup', onMouse);
      node?.removeEventListener('mousemove', onMouse);
    }
  }, [nodeRef, options]);
}

