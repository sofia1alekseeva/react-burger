import ReactDOM from "react-dom";
import { useState, useEffect, FC, PropsWithChildren } from "react";

const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [container] = useState<HTMLDivElement>(() =>
    document.createElement("div")
  );

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
