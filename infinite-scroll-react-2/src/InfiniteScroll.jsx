import React, { useRef, useEffect } from "react";

function InfiniteScroll({ children, loading, onPageEnd }) {
  const containerRef = useRef();

  const isScrollPresent = () => {
    const clientHeight = containerRef.current.clientHeight;
    const scrollHeight = containerRef.current.scrollHeight;
    return scrollHeight > clientHeight;
  };

  const scrollHandler = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (scrollHeight - scrollTop < clientHeight + 100 && !loading) {
      onPageEnd();
    }
  };

  useEffect(() => {
    if (!isScrollPresent() && !loading) {
      onPageEnd();
    }
  }, [children.length, loading]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
      onScroll={scrollHandler}
    >
      {children}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteScroll;
