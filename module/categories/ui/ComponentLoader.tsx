import React from "react";

const ComponentLoader = ({ className = 'h-[60vh] w-screen' }:{ className?:string }) => {
  return (
    <div className={`flex ${className} items-center justify-center`}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid
        border-current border-r-transparent align-[-0.125em] text-gray-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  );
};

export default ComponentLoader;
