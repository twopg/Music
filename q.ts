export default class Q<T> {
  private items: T[] = [];

  get isEmpty() {
    return this.items.length <= 0;
  }
  get length() {
    return this.items.length;
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
}