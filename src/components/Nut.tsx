import React from 'react';

const Nut: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style }) => {
  return (
    <div
      style={style}
      className={`
          relative z-0 pointer-events-none
         bg-slate-400 rounded-t-lg -mx-1
      `}
    />
  );
};
export default Nut;
