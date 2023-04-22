const events = new Map([
  [
    'test',
    (url: string) => {
      console.log('[ url ] >', url);
      return url;
    }
  ]
]);

export default () => {
  const addEvent = (eventName: string, cb: () => void) => {
    // events.set(eventName, cb);
  };

  return {
    events,
    addEvent
  };
};
