import Observable from '../../reactive/Observable';

export default class AsyncController {

  constructor($scope) {
    async function* coordinates() {
      for (let event on Observable.fromEvent(window, 'mousemove')) {
        yield {x: event.clientX, y: event.clientY};
      }
    }

    (async () => {
      for (let {x, y} on coordinates()) {
        $scope.$apply(() => {
          this.move = {x, y};
        });
      }
    })();
  }
}
