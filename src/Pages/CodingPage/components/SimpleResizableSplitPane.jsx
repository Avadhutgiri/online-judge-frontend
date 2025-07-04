import React, { useState, useRef } from "react";

const SimpleResizableSplitPane = ({ 
  children, 
  direction = "vertical", 
  minSize = 100,
  defaultSizes = [50, 50]
}) => {
  const [sizes, setSizes] = useState(defaultSizes);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const startPosRef = useRef(null);
  const startSizesRef = useRef(null);

  if (!Array.isArray(children) || children.length !== 2) {
    return <div>{children}</div>;
  }

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = direction === "vertical" ? e.clientY : e.clientX;
    startSizesRef.current = [...sizes];
    
    document.body.style.cursor = direction === "vertical" ? "ns-resize" : "ew-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const currentPos = direction === "vertical" ? e.clientY : e.clientX;
    const delta = currentPos - startPosRef.current;
    const containerSize = direction === "vertical" 
      ? containerRef.current?.offsetHeight 
      : containerRef.current?.offsetWidth;
    
    if (!containerSize) return;

    const deltaPercent = (delta / containerSize) * 100;
    const newSizes = [...startSizesRef.current];
    
    const minSizePercent = (minSize / containerSize) * 100;
    const maxDelta = Math.min(
      newSizes[0] - minSizePercent,
      newSizes[1] - minSizePercent
    );
    
    const actualDelta = Math.max(-maxDelta, Math.min(maxDelta, deltaPercent));
    
    newSizes[0] += actualDelta;
    newSizes[1] -= actualDelta;
    
    setSizes(newSizes);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // Add event listeners
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <div
      ref={containerRef}
      className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"} h-full w-full relative`}
    >
      {/* First Panel */}
      <div
        className="relative"
        style={{
          [direction === "vertical" ? "height" : "width"]: `${sizes[0]}%`,
          minHeight: direction === "vertical" ? `${minSize}px` : undefined,
          minWidth: direction === "horizontal" ? `${minSize}px` : undefined,
        }}
      >
        {children[0]}
      </div>

      {/* Resizer */}
      <div
        className={`bg-[#86C232] opacity-0 hover:opacity-100 transition-opacity duration-200 relative ${
          direction === "vertical"
            ? "h-1 w-full cursor-ns-resize"
            : "w-1 h-full cursor-ew-resize"
        }`}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`absolute bg-[#86C232] rounded-full ${
            direction === "vertical"
              ? "w-8 h-1 left-1/2 transform -translate-x-1/2"
              : "h-8 w-1 top-1/2 transform -translate-y-1/2"
          }`}
        />
      </div>

      {/* Second Panel */}
      <div
        className="relative"
        style={{
          [direction === "vertical" ? "height" : "width"]: `${sizes[1]}%`,
          minHeight: direction === "vertical" ? `${minSize}px` : undefined,
          minWidth: direction === "horizontal" ? `${minSize}px` : undefined,
        }}
      >
        {children[1]}
      </div>
    </div>
  );
};

export default SimpleResizableSplitPane; 