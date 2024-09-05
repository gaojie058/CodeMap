import { create } from 'zustand';

interface State {
  // toolbar behaviour
  isToolbarOpen: boolean;
  setIsToolbarOpen: (isOpen: boolean) => void;
  toggleToolbar: () => void;

  // toolbar `LocalUnderstanding` data
  selectedNode: string;
  setSelectedNode: (node: string) => void;
  selectedEdge: string;
  setSelectedEdge: (edge: string) => void;
}
const useToolbarStore = create<State>((set) => ({
  isToolbarOpen: false,
  setIsToolbarOpen: (isOpen) => set(({ isToolbarOpen: isOpen })),
  toggleToolbar: () => set((state) => ({ isToolbarOpen: !state.isToolbarOpen })),

  selectedNode: '',
  setSelectedNode: (node: string) => set({ selectedNode: node }),
  selectedEdge: '',
  setSelectedEdge: (edge: string) => set({ selectedEdge: edge }),
}));

export default useToolbarStore;
