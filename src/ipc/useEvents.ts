// const events = new Map<'test' | 'test2', ((url: string) => string) | (() => void)>([
//   [
//     'test',
//     (url: string) => {
//       console.log('[ url ] >', url);
//       return url;
//     }
//   ],
//   ['test2', () => {}]
// ]);

const events = {
  test: (url: string) => {
    console.log('[ url ] >', url);
    return url;
  },
  test2: () => {}
} as const;

export default () => {
  return {
    events
  };
};
