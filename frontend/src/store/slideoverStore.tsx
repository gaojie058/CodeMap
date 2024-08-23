import { create } from 'zustand';

interface State {
  isSlideoverOpen: boolean;
  toggleSlideover: () => void;
}
const useSlideoverStore = create<State>((set) => ({
  isSlideoverOpen: false,
  toggleSlideover: () => set((state) => ({ isSlideoverOpen: !state.isSlideoverOpen })),
}));

export default useSlideoverStore;
