const generator = Symbol();
const onDone = Symbol();

class DecoratedGenerator {
  constructor(_generator, _onDone) {
    this[generator] = _generator;
    this[onDone] = _onDone;
  }

  next(value) {
    var result = this[generator].next(value);
    if (result !== undefined && result.done) {
      this[onDone].call(this);
    }
    return result;
  }

  throw(error) {
    this[onDone].call(this);
    return this[generator].throw(error);
  }

  return(value) {
    this[onDone].call(this);
    return this[generator].return(value);
  }
}

export default class Observable {
  constructor(observe) {
    this[Symbol.observer] = observe;
  }

  static fromEvent(element, type) {
    return new Observable(function (generator) {
      var decoratedGenerator = new DecoratedGenerator(generator,
        () => element.removeEventListener(type, handler));

      var handler = event => decoratedGenerator.next(event);

      element.addEventListener(type, handler);

      return decoratedGenerator;
    });
  }
}
