import { useState, useEffect } from "react";

export function screenResizer() {
  const [isScreenSmallerThan1200, setIsScreenSmallerThan1200] = useState(false);
  const [isScreenSmallerThan840, setIsScreenSmallerThan840] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsScreenSmallerThan1200(window.innerWidth < 1200);
      setIsScreenSmallerThan840(window.innerWidth < 840);
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return { isScreenSmallerThan1200, isScreenSmallerThan840 };
}