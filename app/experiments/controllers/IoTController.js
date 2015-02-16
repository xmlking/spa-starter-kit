// https://docs.pinocc.io/api.html#readonly-token
// https://docs.pinocc.io/api.html#realtime-stream-of-changes
import pinoccio from 'http://api.pinocc.io/pinoccio.js.js';

export default class IoTController {

  constructor($scope, growl) {
    //2067ffafe3b7b815a13bd9f64bb71b92
    var api = pinoccioAPI('7c36027c5769eb9c659828958ed126bb');
    var syncStream = api.sync({stale:1});
    syncStream.on('data', (data) => {
      console.log('data',data);
      growl.info(`type: ${data.type}, scout: ${data.scout}, value: ${data.value}`,{title: data.type, ttl: 20000});
      if (data.type === 'temp' && data.troop === '1' && data.scout === '4') {
        $scope.$apply(() => {
          this.temp = data.value.c;
        });
      }
      if (data.type === 'announce' && data.troop === '1' && data.scout === '4') {
        $scope.$apply(() => {
          this.move = data.value.report[1];
        });
      }
    });
  }
}
