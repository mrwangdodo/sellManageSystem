/**
 *  封装本地存储的操作
 *  2019-10-26 by dodo
 */

export default {
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  }
};
