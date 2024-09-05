import { create } from "zustand";

interface State {
  bizCompDOT: string | null;
  bizGlobalUnderstanding: string | null;
  bizCompLocalDOT: string | null;
  bizCompLocalHighlightFlow: string | null;
  bizCompLocalRelevantFlow: string | null;

  fnCallDOT: string | null;
  fnGlobalUnderstanding: string | null;
  fnCallLocalDOT: string | null;
  fnCallLocalHighlightFlow: string | null;
  fnCallLocalRelevantFlow: string | null;

  setBizCompDOT: (dot: string | null) => void;
  setBizGlobalUnderstanding: (text: string | null) => void;
  setBizCompLocalDOT: (dot: string | null) => void;
  setBizCompLocalHighlightFlow: (text: string | null) => void;
  setBizCompLocalRelevantFlow: (text: string | null) => void;

  setFnCallDOT: (dot: string | null) => void;
  setFnCallLocalDOT: (dot: string | null) => void;
  setFnGlobalUnderstanding: (text: string | null) => void;
  setFnCallLocalHighlightFlow: (text: string | null) => void;
  setFnCallLocalRelevantFlow: (text: string | null) => void;
}
const useStore = create<State>((set) => ({
  bizCompDOT: null,
  bizGlobalUnderstanding: null,
  bizCompLocalDOT: null,
  bizCompLocalHighlightFlow: null,
  bizCompLocalRelevantFlow: null,

  fnCallDOT: null,
  fnGlobalUnderstanding: null,
  fnCallLocalDOT: null,
  fnCallLocalHighlightFlow: null,
  fnCallLocalRelevantFlow: null,

  setBizCompDOT: (dot) => set({ bizCompDOT: dot }),
  setBizGlobalUnderstanding: (text) => set({ bizGlobalUnderstanding: text }),
  setBizCompLocalDOT: (dot) => set({ bizCompLocalDOT: dot }),
  setBizCompLocalHighlightFlow: (text) => set({ bizCompLocalHighlightFlow: text }),
  setBizCompLocalRelevantFlow: (text) => set({ bizCompLocalRelevantFlow: text }),

  setFnCallDOT: (dot) => set({ fnCallDOT: dot }),
  setFnGlobalUnderstanding: (text) => set({ fnGlobalUnderstanding: text }),
  setFnCallLocalDOT: (dot) => set({ fnCallLocalDOT: dot }),
  setFnCallLocalHighlightFlow: (text) => set({ fnCallLocalHighlightFlow: text }),
  setFnCallLocalRelevantFlow: (text) => set({ fnCallLocalRelevantFlow: text }),
}));

export default useStore;