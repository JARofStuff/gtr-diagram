import { StateCreator } from 'zustand';
import { State, Middlewares } from './store';
import { NoteSymbols, NoteSymbolsType, BasicNoteSymbols } from './notes.slice';

export type ControlsSlice = {
  selectedControl: NoteSymbolsType;
  setSelectedControl: (selectedControl: NoteSymbolsType) => void;
};

export const createControlsSlice: StateCreator<State, Middlewares, [], ControlsSlice> = (set) => ({
  selectedControl: NoteSymbols.default,
  setSelectedControl(selectedControl) {
    return set({ selectedControl }, false, 'CONTROLS/SET_SELECTED_CONTROL');
  },
});
