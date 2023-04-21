import { ipcMain } from 'electron';
import useEvents from './useEvents';

export default () => {
  const { events } = useEvents();
  return () => {
    new Proxy(events, {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        console.log(
          '%c [ 123 ]',
          'font-size:13px; background:pink; color:#bf2c9f;',
          target,
          key,
          value,
          receiver
        );
        console.log('%c [ 456 ]', 'font-size:13px; background:pink; color:#bf2c9f;', result);
        return result;
      }
    });

    ipcMain.handle('dialog:openFile', () => {
      console.log('[ 123123 ] >', events);
    });
  };
};
