import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import createIpcRenderer from '../ipc/createIpcRenderer';

// Custom APIs for renderer
const ipcRendererApi = createIpcRenderer();

const api = ipcRendererApi();

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

// contextBridge.exposeInMainWorld('electronAPI', {
//   openFile: () => ipcRenderer.invoke('dialog:openFile')
// });
