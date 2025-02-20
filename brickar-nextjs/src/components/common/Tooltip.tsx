import React from 'react';

const Tooltip = ({ content }: any) => {
  return (
    <div className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-4.5 py-1.5 text-sm font-medium opacity-0 drop-shadow-4 group-hover:opacity-100 dark:bg-meta-4">
      <span className="absolute -bottom-1 left-1/2 -z-10 size-2 -translate-x-1/2 rotate-45 rounded-l-sm bg-white dark:bg-meta-4"></span>
      {content}
    </div>
  );
};

export default Tooltip;
