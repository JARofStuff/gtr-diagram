const Circle = ({ outline = false, label = '' }: { outline?: boolean; label?: String }) => {
  return (
    <div
      className={`
        rounded-full aspect-square h-3/5
        flex justify-center items-center text-2xl font-bold 
        border-4 border-slate-700 
        ${outline ? 'bg-white text-bg-slate-700' : 'bg-slate-700 text-white'}
      `}
    >
      {label}
    </div>
  );
};

export default Circle;
