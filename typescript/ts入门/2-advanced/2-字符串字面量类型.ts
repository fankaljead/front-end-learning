type EventName = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventName) {
  // Do something
}
handleEvent(document.getElementById("hello"), "scroll"); // OK
handleEvent(document.getElementById("world"), "dbclick"); // Error