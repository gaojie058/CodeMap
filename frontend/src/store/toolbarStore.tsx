import { create } from 'zustand';

interface State {
  // toolbar behaviour
  isToolbarOpen: boolean;
  toolbarContext: 'global' | 'local';
  setToolbarContext: (context: 'global' | 'local') => void;
  setIsToolbarOpen: (isOpen: boolean, context?: 'global' | 'local') => void;
  toggleToolbar: () => void;

  // toolbar `LocalUnderstanding` data
  selectedNode: string;
  setSelectedNode: (node: string) => void;
  selectedEdge: string;
  setSelectedEdge: (edge: string) => void;
}
const useToolbarStore = create<State>((set) => ({
  isToolbarOpen: true,
  toolbarContext: 'global',
  setToolbarContext: (context) => set({ toolbarContext: context }),
  setIsToolbarOpen: (isOpen, context) => set(({ isToolbarOpen: isOpen, toolbarContext: context })),
  toggleToolbar: () => set((state) => ({ isToolbarOpen: !state.isToolbarOpen })),

  selectedNode: '',
  setSelectedNode: (node: string) => set({ selectedNode: node }),
  selectedEdge: '',
  setSelectedEdge: (edge: string) => set({ selectedEdge: edge }),
}));

export default useToolbarStore;
