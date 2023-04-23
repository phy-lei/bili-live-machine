import { ElectronAPI } from '@electron-toolkit/preload';
import useEvents from '../ipc/useEvents';

const { events } = useEvents();

// 给函数添加一层Promise包裹
type PromiseWrap<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

type Events = typeof events;
declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      [K in keyof Events]: PromiseWrap<Events[K]>;
    };
  }
}
