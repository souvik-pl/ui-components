import { useCallback, useEffect, useRef, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) setData(data);
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

const useAggregatedList = (list) => {
  const [aggregatedList, setAggregatedList] = useState([]);

  useEffect(() => {
    if (Array.isArray(list) && list.length > 0) {
      setAggregatedList((prev) => [...prev, ...list]);
    }
  }, [list]);

  return aggregatedList;
};

const InfiniteScroll = ({
  width,
  height,
  list,
  loading,
  onPageEnd, // Make sure onPageEnd reference is stable, as it is used as dependency in useEffect
}) => {
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  const isScrollPresent = useCallback(() => {
    if (!containerRef.current) return false;

    const clientHeight = containerRef.current.clientHeight;
    const scrollHeight = containerRef.current.scrollHeight;
    return scrollHeight > clientHeight;
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    let observer = null;
    const observerElement = observerRef.current;

    if (list.length > 0 && isScrollPresent()) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onPageEnd();
        }
      });
      observer.observe(observerElement);
    }

    if (list.length > 0 && !isScrollPresent()) {
      onPageEnd();
    }

    return () => {
      if (observer && observerElement) {
        observer.unobserve(observerElement);
        observer.disconnect();
      }
    };
  }, [list.length, isScrollPresent, onPageEnd]);

  return (
    <div ref={containerRef} style={{ width, height, overflowY: "auto" }}>
      {list.length === 0 && loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
      {list}
      {list.length > 0 && (
        <div
          ref={observerRef}
          style={{ height: "50px", backgroundColor: "pink" }}
        >
          {loading && <>Loading...</>}
        </div>
      )}
    </div>
  );
};

function App() {
  const [skip, setSkip] = useState(0);
  const url = `https://dummyjson.com/products?select=title,price&limit=3&skip=${skip}`;
  const { data, loading, error } = useFetch(url);
  const aggregatedList = useAggregatedList(data ? data.products : []);

  const onPageEnd = useCallback(() => {
    setSkip((prev) => prev + 3);
  }, []);

  return (
    <div
      style={{
        width: "300px",
        height: "250px",
        border: "1px solid black",
      }}
    >
      <InfiniteScroll
        width="100%"
        height="100%"
        loading={loading}
        list={aggregatedList.map((item) => (
          <div
            key={item.id}
            style={{ height: "50px", border: "1px solid green" }}
          >
            {item.title}
          </div>
        ))}
        onPageEnd={onPageEnd}
      />
    </div>
  );
}

export default App;
