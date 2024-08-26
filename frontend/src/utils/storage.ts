interface Token {
  accessToken: string;
  refreshToken?: string;
}

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

const storagePrefix = 'codemap_';

const storage = {
  getToken: (): Token | null => {
    const item = window.localStorage.getItem(storagePrefix + 'token');
    return item ? JSON.parse(item) : null;
  },

  setToken: (token: Token): void => {
    window.localStorage.setItem(storagePrefix + 'token', JSON.stringify(token));
  },

  clearToken: (): void => {
    window.localStorage.removeItem(storagePrefix + 'token');
  },

  getCurrentFile: (): FileData | null => {
    const item = window.localStorage.getItem(storagePrefix + 'currentfile');
    return item ? JSON.parse(item) : null;
  },

  setCurrentFile: (fileData: FileData): void => {
    window.localStorage.setItem(storagePrefix + 'currentfile', JSON.stringify(fileData));
  },

  clearCurrentFile: (): void => {
    window.localStorage.removeItem(storagePrefix + 'currentfile');
  },
};

export default storage;
