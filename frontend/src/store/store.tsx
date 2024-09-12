import { create } from "zustand";

interface State {
  bizDot: string | null;
  bizGlobal: any | null;
  bizLocalDot: string | null;
  bizLocalHighlight: any | null;
  bizLocalRelevant: any | null;
  bizSelectedNode: string | null;
  isBizLoading: boolean;
  isBizLocalLoading: boolean;

  funcDot: string | null;
  funcGlobal: any | null;
  funcLocalDot: string | null;
  funcLocalHighlight: any | null;
  funcLocalRelevant: any | null;
  funcSelectedNode: string | null;
  isFuncLoading: boolean;
  isFuncLocalLoading: boolean;

  setbizDot: (dot: string | null) => void;
  setBizGlobal: (text: string | null) => void;
  setBizLocalDot: (dot: string | null) => void;
  setBizLocalHighlight: (text: string | null) => void;
  setBizLocalRelevant: (text: string | null) => void;
  setBizSelectedNode: (text: string | null) => void;
  setIsBizLoading: (loading: boolean) => void;
  setIsBizLocalLoading: (loading: boolean) => void;

  setFuncDot: (dot: string | null) => void;
  setFuncLocalDot: (dot: string | null) => void;
  setFuncGlobal: (text: string | null) => void;
  setFuncLocalHighlight: (text: string | null) => void;
  setFuncLocalRelevant: (text: string | null) => void;
  setFuncSelectedNode: (text: string | null) => void;
  setIsFuncLoading: (loading: boolean) => void;
  setIsFuncLocalLoading: (loading: boolean) => void;
}
const useStore = create<State>((set) => ({
  bizDot: null,
  bizGlobal: null,
  bizLocalDot: null,
  bizLocalHighlight: null,
  bizLocalRelevant: null,
  bizSelectedNode: null,
  isBizLoading: false,
  isBizLocalLoading: false,

  funcDot: null,
  funcGlobal: null,
  funcLocalDot: null,
  funcLocalHighlight: null,
  funcLocalRelevant: null,
  funcSelectedNode: null,
  isFuncLoading: false,
  isFuncLocalLoading: false,

  setbizDot: (dot) => set({ bizDot: dot }),
  setBizGlobal: (text) => set({ bizGlobal: text }),
  setBizLocalDot: (dot) => set({ bizLocalDot: dot }),
  setBizLocalHighlight: (text) => set({ bizLocalHighlight: text }),
  setBizLocalRelevant: (text) => set({ bizLocalRelevant: text }),
  setBizSelectedNode: (text) => set({ bizSelectedNode: text }),
  setIsBizLoading: (loading) => set({ isBizLoading: loading }),
  setIsBizLocalLoading: (loading) => set({ isBizLocalLoading: loading }),

  setFuncDot: (dot) => set({ funcDot: dot }),
  setFuncGlobal: (text) => set({ funcGlobal: text }),
  setFuncLocalDot: (dot) => set({ funcLocalDot: dot }),
  setFuncLocalHighlight: (text) => set({ funcLocalHighlight: text }),
  setFuncLocalRelevant: (text) => set({ funcLocalRelevant: text }),
  setFuncSelectedNode: (text) => set({ funcSelectedNode: text }),
  setIsFuncLoading: (loading) => set({ isFuncLoading: loading }),
  setIsFuncLocalLoading: (loading) => set({ isFuncLocalLoading: loading }),
}));

export default useStore;