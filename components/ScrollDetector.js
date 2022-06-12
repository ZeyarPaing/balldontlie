import { useEffect } from "react";

const ScrollDetector = ({ onScrollEnd, children }) => {
  let prevScrollTop = 0;

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop > prevScrollTop) {
      if (scrollTop + clientHeight >= scrollHeight - 700) {
        onScrollEnd();
      }
    }
    prevScrollTop = scrollTop;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div>{children}</div>;
};

export default ScrollDetector;
