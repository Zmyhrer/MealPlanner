import { useEffect, RefObject, useCallback } from "react";

// Allow ref.current to be null (normal for React)
export function useShiftHorizontalScroll<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const el = ref.current;
      if (!el) return; // safely handle null

      if (e.shiftKey || Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY });
      }
    },
    [ref]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [ref, handleWheel]);
}
