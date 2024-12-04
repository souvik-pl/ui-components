import React, { useEffect, useRef } from "react";

function InfiniteScroll({ children, width, height, onPageEnd }) {
  const observerRef = useRef();
  const containerRef = useRef();

  function isScrollbarPresent() {
    const clientHeight = containerRef.current.clientHeight;
    const scrollHeight = containerRef.current.scrollHeight;
    return scrollHeight > clientHeight;
  }

  useEffect(() => {
    let observer;
    if (children.length > 0 && isScrollbarPresent()) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onPageEnd();
        }
      });

      observer.observe(observerRef.current);
    }

    if (children.length > 0 && !isScrollbarPresent()) {
      onPageEnd();
    }

    return () => observer && observer.unobserve(observerRef.current);
  }, [children.length]);

  return (
    <div ref={containerRef} style={{ width, height, overflowY: "auto" }}>
      {children}
      {children.length > 0 && (
        <div
          style={{
            height: "100px",
            backgroundColor: "pink",
          }}
          ref={observerRef}
        ></div>
      )}
    </div>
  );
}

export default InfiniteScroll;
