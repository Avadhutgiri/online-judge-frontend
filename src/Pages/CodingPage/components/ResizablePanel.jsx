import React, { useState, useRef, useEffect } from "react";

const ResizablePanel = ({ 
  children, 
  direction = "vertical", 
  minSize = 100, 
  maxSize = null,
  defaultSize = null,
  onResize = null 
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);
  const startPosRef = useRef(null);
  const startSizeRef = useRef(null);

  useEffect(() => {
    if (defaultSize) {
      setSize(defaultSize);
    }
  }, [defaultSize]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = direction === "vertical" ? e.clientY : e.clientX;
    startSizeRef.current = size || panelRef.current?.offsetHeight || panelRef.current?.offsetWidth;
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = direction === "vertical" ? "ns-resize" : "ew-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const currentPos = direction === "vertical" ? e.clientY : e.clientX;
    const delta = currentPos - startPosRef.current;
    const newSize = startSizeRef.current + delta;

    // Apply constraints
    let constrainedSize = Math.max(minSize, newSize);
    if (maxSize) {
      constrainedSize = Math.min(maxSize, constrainedSize);
    }

    setSize(constrainedSize);
    if (onResize) {
      onResize(constrainedSize);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const panelStyle = {
    [direction === "vertical" ? "height" : "width"]: size ? `${size}px` : "auto",
    flex: size ? "none" : "1",
    minHeight: direction === "vertical" ? `${minSize}px` : undefined,
    minWidth: direction === "horizontal" ? `${minSize}px` : undefined,
    maxHeight: direction === "vertical" && maxSize ? `${maxSize}px` : undefined,
    maxWidth: direction === "horizontal" && maxSize ? `${maxSize}px` : undefined,
  };

  return (
    <div
      ref={panelRef}
      style={panelStyle}
      className={`relative ${isResizing ? "select-none" : ""}`}
    >
      {children}
      <div
        className={`absolute bg-[#86C232] opacity-0 hover:opacity-100 transition-opacity duration-200 ${
          direction === "vertical"
            ? "h-1 w-full bottom-0 cursor-ns-resize"
            : "w-1 h-full right-0 cursor-ew-resize"
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizablePanel; 