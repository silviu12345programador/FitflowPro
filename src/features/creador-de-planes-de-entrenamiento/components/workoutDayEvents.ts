
type EventHandler = () => void;

class EventEmitter {
  private events: { [key: string]: EventHandler[] } = {};

  subscribe(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  unsubscribe(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filter(h => h !== handler);
  }

  publish(eventName: string) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(handler => handler());
  }
}

export const workoutDayEvents = new EventEmitter();
