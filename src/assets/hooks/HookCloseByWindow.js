import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let mayBEHandler = (e) => {
      if (!domNode.current?.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", mayBEHandler);
    return () => {
      document.removeEventListener("mousedown", mayBEHandler);
    };
  });

  return domNode;
};
