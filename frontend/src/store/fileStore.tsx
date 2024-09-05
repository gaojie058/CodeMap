import { create } from 'zustand';

interface State {
  isFileUploaded: boolean;
  setIsFileUploaded: (uploaded: boolean) => void;
}
const useFileStore = create<State>((set) => ({
  isFileUploaded: false,
  setIsFileUploaded: (uploaded) => set({ isFileUploaded: uploaded }),
}));

export default useFileStore;