declare var jQuery: (selector: string) => any;
declare function jQuery2(selector: string): any;
declare function jQuery2(domReadyCallback: () => any): any;
// declare const jQuery2 = function(selector) {
//   return document.querySelector(selector);
// };

declare namespace jQuery23 {
  function ajax(url: string, setting?: any): void;
  const version: number;
  class Event {
    blur(eventType: EventType): void;
  }
  enum EventType {
    CustomClick,
  }
  namespace fn {
    function extend(obj: any): void;
  }
}
