import { useEffect, RefObject } from "react";

export function useDragToScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMouseUp = () => {
      isDown = false;
      el.style.cursor = "";
      el.style.removeProperty("user-select");
    };

    const onMouseLeave = () => {
      isDown = false;
      el.style.cursor = "";
      el.style.removeProperty("user-select");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, [ref, enabled]);
}
