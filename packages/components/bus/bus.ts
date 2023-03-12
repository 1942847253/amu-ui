interface IState {
  [key: string]: Function;
}

class EventBus {
  state: IState;
  constructor() {
    this.state = {};
  }

  $on(eventName: string, callback: Function) {
    this.state[eventName] = callback;
  }

  $emit(eventName: string, ...args: any) {
    const callback = this.state[eventName];
    if (typeof callback === "function") {
      callback(...args);
    } else {
      console.error("callback is not a function eventName：" + eventName);
    }
  }

  $off(eventName?: string) {
    if (eventName && this.state[eventName]) {
      delete this.state[eventName];
    } else {
      this.state = {};
    }
  }
}

const $bus = new EventBus();

export default $bus;
