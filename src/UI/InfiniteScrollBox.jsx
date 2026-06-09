import React, { useEffect, useRef } from "react";

const InfiniteScrollBox = ({
  fetchData,
  renderData,
  loadingComponent,
  className = "",
  page,
  lastPage,
  onPageChange,
  isLoading,
  height,
}) => {
  const containerRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;

      const scrollPercent =
        (scrollTop + clientHeight) / scrollHeight;

      if (
        scrollPercent >= 0.9 &&
        !hasTriggered.current &&
        page < lastPage
      ) {
        hasTriggered.current = true;
        onPageChange(page + 1);
      }

      if (scrollPercent < 0.9) {
        hasTriggered.current = false;
      }
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [page, lastPage]);

  const isEmpty = !fetchData || fetchData.length === 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-4 overflow-y-auto ${className}`}
    >
      {isEmpty && !isLoading ? (
        <div className="w-full flex justify-center items-center py-6 text-gray-400">
          داده‌ای وجود ندارد
        </div>
      ) : (
        fetchData?.map((item, index) => renderData(item))
      )}

      <div className="w-full flex justify-center items-center">
        <div className="text-center text-gray-500 w-full">
          {loadingComponent && isLoading && loadingComponent}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollBox;