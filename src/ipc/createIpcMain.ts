import { ipcMain } from 'electron';
import useEvents from './useEvents';

let ipcMainInstance;
export default () => {
  const { events } = useEvents();

  const createApi = () => {
    events.forEach((cb, key) => {
      ipcMain.handle(key, (event, ...args: [any]) => {
        return cb(...args);
      });
    });

    return createApi;
  };

  return () => {
    if (ipcMainInstance) {
      return ipcMainInstance;
    }
    return (ipcMainInstance = createApi());
  };
};
