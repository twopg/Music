export default class Q<T> implements Iterator<T> {
  private _items: T[] = [];
  private counter = 0;

  get isEmpty() {
    return this.items.length <= 0;
  }
  get length() {
    return this.items.length;
  }
  get items() {
    return this._items;
  }

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  next(): { done: boolean, value: T } {
    return {
      done: false,
      value: this.items[this.counter++]
    }
  }
}