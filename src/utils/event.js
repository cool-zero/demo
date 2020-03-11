export const on = (function() {
  //  查询实例是否在服务端运行，与是否支持 addEventListener，返回对应处理监听函数
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        //  适用于现代浏览器的监听事件 addEventListener
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        //  用于 ie 部分版本浏览器的监听事件 attachEvent
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  //  查询实例是否在服务端运行，与是否支持 removeEventListener，返回对应处理监听函数
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        //  适用于现代浏览器的移除事件监听 removeEventListener
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        //  用于 ie 部分版本浏览器的移除事件监听 detachEvent
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
