import { useEffect, useState } from "react";

export default function useCanvasDrawContext(canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) {
  const [ctx, setCtx] = useState(null as CanvasRenderingContext2D | null);
  useEffect(() => {
    setCtx(canvasRef.current?.getContext('2d') || null);
  }, [canvasRef]);
  return ctx;
}
