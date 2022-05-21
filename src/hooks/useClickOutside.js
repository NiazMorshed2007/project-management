import { useRef, useEffect } from "react";

let useClickOutside = (handler) => {
  let DOMnode = useRef();

  useEffect(() => {
    let check = (event) => {
      if (!DOMnode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", check);

    return () => {
      document.removeEventListener("mousedown", check);
    };
  });

  return DOMnode;
};

export default useClickOutside;
