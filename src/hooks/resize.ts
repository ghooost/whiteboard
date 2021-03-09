import { useEffect, useRef, useState } from "react";

export default function useResize(
  nodeRef: React.MutableRefObject<HTMLDivElement | null>,
  timeout: number = 100,
): number[] {
  const [size, setSize] = useState([0, 0]);
  const timerRef = useRef(null as NodeJS.Timeout | null);
  useEffect(() => {
    const node = nodeRef.current;
    const onResize = () => {
      const rect = node?.getBoundingClientRect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setSize([rect?.width || 0, rect?.height || 0]);
      }, timeout)
    }
    window?.addEventListener('resize', onResize);
    onResize();
    return () => {
      window?.removeEventListener('resize', onResize);
    }
  }, [nodeRef, timeout]);
  return size;
}
