import { useEffect, useRef } from 'react';

import ExportRegion from './components/ExportRegion';
import ChordDiagram from './components/ChordDiagram';

import './index.css';
import ControlsMenu from './components/ControlsMenu/ControlsMenu';
import useStore from './store/store';

export const defaultSettings = {
  stringsCount: 6,
  fretsCount: 5,
  defaultChordLabel: 'Cmaj7',
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
};

function App() {
  const setConfig = useStore((state) => state.setConfig);
  // const notePositions = useStore((state) => state.notePositions);
  // console.log(notePositions);

  useEffect(() => {
    if (!setConfig) return;

    setConfig(defaultSettings);
  }, []);

  return (
    <div
      className={`
        mx-auto
        h-screen w-screen min-h-screen max-w-4xl
      `}
    >
      <div
        className={`
          w-full h-full flex flex-row justify-center items-center
          p-2 gap-2
          `}
      >
        <ControlsMenu />
        <div
          className={`
          flex grow flex-col items-center justify-center h-full
        `}
        >
          <ExportRegion>
            <ChordDiagram />
          </ExportRegion>
        </div>
      </div>
    </div>
  );
}

export default App;
