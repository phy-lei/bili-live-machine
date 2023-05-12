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

export default createSgp;
