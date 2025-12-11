import React from "react";
import { useSelector } from "react-redux";

const SegmentedProgressBar = () => {
  const progress = useSelector((store) => store.app.hostProgress);
  
  // Total number of segments (steps) - based on image showing ~3 segments
  const totalSegments = 3;
  const segmentWidth = 100 / totalSegments; // Each segment is 33.33%
  
  // Calculate how many full segments are filled
  const fullSegments = Math.floor(progress / segmentWidth);
  
  // Calculate the partial progress within the current segment
  const currentSegmentProgress = (progress % segmentWidth) / segmentWidth;
  const currentSegmentWidth = currentSegmentProgress * segmentWidth;

  return (
    <div className="w-full h-1 flex relative">
      {Array.from({ length: totalSegments }).map((_, index) => {
        const isFullyFilled = index < fullSegments;
        const isCurrentSegment = index === fullSegments;
        
        return (
          <React.Fragment key={index}>
            <div className="relative" style={{ width: `${segmentWidth}%` }}>
              {/* Background (gray) */}
              <div className="h-full bg-gray-200 absolute inset-0" />
              
              {/* Filled portion (black) */}
              {isFullyFilled && (
                <div className="h-full bg-black absolute inset-0 transition-all duration-300" />
              )}
              
              {/* Partial fill for current segment */}
              {isCurrentSegment && currentSegmentProgress > 0 && (
                <div
                  className="h-full bg-black absolute left-0 top-0 transition-all duration-300"
                  style={{ width: `${currentSegmentWidth}%` }}
                />
              )}
            </div>
            
            {/* Separator */}
            {index < totalSegments - 1 && (
              <div className="h-full w-px bg-white z-10" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SegmentedProgressBar;

