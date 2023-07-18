// store.ts
import {create} from 'zustand'

type Tweet = {
    id:number,
    text:string
}

type StateValues = {
  tweets: Tweet[];
};

type StateSetters = {
  setTweets: (tweet: Tweet[]) => void;
  reset: () => void;
};

type State = StateValues & StateSetters;

const initialState: StateValues = {
  tweets: [{ id: 0, text: '' }],
};

export const useStore = create<State>((set) => ({
  ...initialState,
  setTweets: (tweets) => set((state) => ({ ...state, tweets })),
  reset: () => set(() => initialState)
}));
