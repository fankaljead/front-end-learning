class EventMitter {
  constructor() {
    if (!EventMitter.instance) {
      EventMitter.instance = this;
      this.handleMap = {};
    }

    return EventMitter.instance;
  }

  on(eventName, callback) {
    this.handleMap[eventName] = this.handleMap[eventName] ?? [];
    this.handleMap[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (this.handleMap[eventName]) {
      const handlers = [...this.handleMap[eventName]];
      handlers.forEach((handler) => handler(...args));
    }
  }

  remove(eventName, callback) {
    const callbacks = this.handleMap[eventName];
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.remove(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
