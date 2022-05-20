import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const domNode = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!domNode.current?.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return domNode;
};

export default useClickOutside;
