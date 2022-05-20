import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!domNode.current?.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return domNode;
};
