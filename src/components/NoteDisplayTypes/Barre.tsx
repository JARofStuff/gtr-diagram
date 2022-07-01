import { useState, useRef } from 'react';
import useMeasure from 'react-use-measure';
import useStore from '../../store/store';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { CgArrowsH } from 'react-icons/cg';
import type { SymbolComponent } from './index';

const Barre = ({ note, outline = false, label, span = 2, handleRemoveSelf }: SymbolComponent) => {
  label = 'D';
  const VISUAL_ADJUST = 2.5; //visually adjusted to same width as Circle
  const MAX_BARRE_WIDTH = `${((span - 1 / VISUAL_ADJUST) / span) * 100}%`;
  const DRAG_AREA_WIDTH = `${((span - 1 / (VISUAL_ADJUST * 2)) / span) * 100}%`;

  const [showResizeControls, setShowResizeControls] = useState(false);
  const setBarrePosition = useStore((state) => state.setBarrePosition);

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [wrapRef, wrapBounds] = useMeasure();
  const [barreParentRef, parentBounds] = useMeasure();

  const [{ width, opacity }, api] = useSpring(
    () => ({
      from: { width: parentBounds.width || '100%', opacity: 0 },
      to: { width: parentBounds.width || '100%' },
    }),
    [parentBounds]
  );

  const bind = useDrag(
    ({ movement: [mx], dragging, last }) => {
      if (dragging) api.start({ to: { width: parentBounds.width + mx } });

      if (last) {
        api.start({ to: { opacity: 0 }, onRest: () => setShowResizeControls(false) });
        if (!note) return;
        const gridSpanSize = wrapBounds.width / span;
        const newSpan = Math.round(span - -mx / gridSpanSize);
        if (span <= 1 || newSpan >= span) return;
        setBarrePosition({ ...note, symbol: { style: note.symbol.style, span: newSpan } });
      }
    },
    { bounds: dragAreaRef }
  );

  const handleOnClick = () => {
    if (!showResizeControls) {
      api.start({ to: { opacity: 1 } });
      setShowResizeControls(true);
      return;
    }
  };

  return (
    <div ref={wrapRef} className='flex justify-center items-center w-full h-full'>
      <div
        ref={barreParentRef}
        style={{ width: MAX_BARRE_WIDTH }}
        className={` h-3/5 w-full relative `}
      >
        <div
          className={`
            absolute z-30 inset-0 h-full aspect-square pointer-events-none
            flex justify-center items-center text-2xl font-bold 
            ${outline ? 'text-slate-700' : ' text-white'}
          `}
        >
          {label}
        </div>
        <div
          ref={dragAreaRef}
          style={{ width: DRAG_AREA_WIDTH }}
          className={` absolute bottom-0 right-0 -top-8 `}
        />

        <animated.div
          className={`
            absolute z-20 h-full
            rounded-full
            text-2xl font-bold text-white
            border-4 border-slate-700 
            ${outline ? 'bg-white text-bg-slate-700' : 'bg-slate-700 text-white'}
          `}
          style={{ width }}
          onClick={handleOnClick}
        >
          {showResizeControls && (
            <animated.div
              {...bind()}
              style={{ opacity }}
              className={`
              absolute z-50
              h-full aspect-[2/3] right-0
              flex justify-center items-center text-2xl font-bold text-white
              touch-pan-y cursor-col-resize 
            `}
            >
              <div
                className={`
                absolute right-0 translate-x-1/2
                flex justify-center items-center
                w-6 h-full
              `}
              >
                <div className={`bg-pink-400  p-1 w-6 h-6 rounded-full`}>
                  <CgArrowsH className='w-full h-auto' />
                </div>
              </div>
            </animated.div>
          )}
        </animated.div>
      </div>
    </div>
  );
};

export default Barre;