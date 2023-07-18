// store.ts
import {create} from 'zustand'

type thread = {
    id:number,
    text:string
}

type StateValues = {
  threads: thread[];
};

type StateSetters = {
  setthreads: (thread: thread[]) => void;
  reset: () => void;
};

type State = StateValues & StateSetters;

const initialState: StateValues = {
  threads: [{ id: 0, text: '' }],
};

export const useStore = create<State>((set) => ({
  ...initialState,
  setthreads: (threads) => set((state) => ({ ...state, threads })),
  reset: () => set(() => initialState)
}));
