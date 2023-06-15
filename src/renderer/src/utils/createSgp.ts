type NonVoidReturn<T extends (...args: any) => any> = T extends (...args: any) => infer R
  ? R extends void
    ? never
    : T
  : any;

/**
 * 创建单例模式的函子
 * @param {function} fn
 * @returns {any} fn调用的返回值 可推断
 */
const createSgp = <T extends (...args: any) => any>(fn: NonVoidReturn<T>) => {
  let _instance: undefined | ReturnType<T>;

  return () => {
    if (!_instance) {
      _instance = fn();
    }
    return _instance;
  };
};

type LastArrItem<T extends any[]> = T extends [...any, infer L] ? L : any;

type FirstArrItem<T extends any[]> = T extends [infer L, ...any] ? L : any;

type Shift<T extends any[]> = T extends [any, ...infer U] ? U : never;

// 参数是最后一个函数的参数 返回值为第一个函数的返回值
type ComposeReturnType<T extends Array<(...args: any) => any>> = (
  ...args: Parameters<LastArrItem<T>>
) => ReturnType<FirstArrItem<T>>;

const compose = <T extends Array<(...args: any) => any>>(...fn: T): ComposeReturnType<T> =>
  fn.reduce((acc, cur) => {
    return (...args) => acc(cur(...args));
  });

export default createSgp;
