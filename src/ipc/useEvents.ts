const events = new Map();

export default () => {
  const addEvent = (eventName: string, cb: () => void) => {
    events.set(eventName, cb);
  };

  return {
    events,
    addEvent
  };
};
