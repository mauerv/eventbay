import { useRef, useEffect } from 'react';

type ScrollableElement = HTMLUListElement | HTMLOListElement;

export default function useElementScroll(updateTracker: any) {
  // The target component needs to have "overflow-y: auto;" for this to work.
  const elementRef = useRef<ScrollableElement>(null!);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [updateTracker]);

  return elementRef;
}
