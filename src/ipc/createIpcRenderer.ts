import { ipcRenderer } from 'electron';
import useEvents from './useEvents';

let ipcRendererInstance;

export default () => {
  const { events } = useEvents();

  const createApi = () => {
    const api = {};

    for (const [key, cb] of Object.entries(events)) {
      api[key] = (...args: any[]) => ipcRenderer.invoke(key, ...args);
    }

    return api;
  };

  // 实例化
  return () => {
    if (ipcRendererInstance) {
      return ipcRendererInstance;
    }
    return (ipcRendererInstance = createApi());
  };
};
