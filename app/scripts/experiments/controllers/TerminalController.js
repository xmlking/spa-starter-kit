import 'sockjs';
import 'stomp';
import 'term';
export default class TerminalController {

    constructor($scope,  $stateParams, $eventBus) {
        this.term = new Terminal({
            cols: 150,
            rows: 35,
            useStyle: true,
            screenKeys: true,
            cursorBlink: true
        });

        this.term.on('title', function(title) {
            document.title = title;
        });

        var divTerminal = document.getElementById('terminal');
        this.term.open(divTerminal);
        this.term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

        this.term.on('data', (data) => {
            $eventBus.publish(`/app/terminal/input/${$stateParams.containerId}`,data);
        });

        let onLogMessage = (log) =>{
            this.term.write(JSON.parse(log.body) +'\r\n');
        };

        let onLogError = (log) =>{
            this.term.write('\x1b[31m'+JSON.parse(log.body) +'\x1b[m\r\n');
        };

        let onKeyStroke = (log) =>{
            this.term.write(JSON.parse(log.body));
        };

        $eventBus.registerHandler('/topic/terminal/log', onLogMessage);
        $eventBus.registerHandler('/topic/terminal/error', onLogError);
        $eventBus.registerHandler(`/user/queue/terminal/input/${$stateParams.containerId}`, onKeyStroke);

        // Controller Destructor listener
        $scope.$on('$destroy', () => {
            $eventBus.unregisterHandler('/topic/terminal/log');
            $eventBus.unregisterHandler('/topic/terminal/error');
            $eventBus.unregisterHandler('/user/queue/terminal/input');
            this.term.destroy();
        });

    }

}