const _scope = Symbol('scope');
const _eventBus = Symbol('eventBus');

export default class MessagingController {

    constructor($scope, growl, $eventBus, UserService) {


        this.users = [];
        this.rooms = [];
        this.messages = [];
        this.notifications = [];
        this.selectedUser = 'All';
        this.selectedRoom = 'Developers';
        this.joined = false;
        this[_scope] = $scope;
        this[_eventBus] = $eventBus;

        let notify = (message, error) => {
            if(this.notifications.length > 2) {
                this.notifications.shift();
            }
            // $scope.$apply(() => { ???
            this.notifications.push({message, error});
        };


        if(!UserService.isLoggedIn()) {notify('Please login to participate in the Chat', true);}

        $scope.$watch(
            () => $eventBus.readyState.value,
            (value) =>  {
                this.readyState = value;
                notify(`Connection state: ${this[_eventBus].readyState.description}`, $eventBus.readyState.value > 2);
            }
        );

        this.getChatRooms();
        this.getActiveUsers('stocks');

        let onMessage = (message, privt = false) => {
            if (message.body) {
                $scope.$apply(() => {
                    if (this.messages.length > 9) {
                        this.messages.shift();
                    }
                    this.messages.push({message:JSON.parse(message.body),private:privt});
                });
            }
        };

        let onError = (error) => {
            if (error.body) {
                $scope.$apply( () => {
                    notify(error.body, true);
                });
            }
        };
        let onStockQuote = (message) => {
            switch (message.headers.destination) {
                case '/topic/price.stock.AAPL' :
                    this.AAPL = JSON.parse(message.body);
                    break;
                case '/topic/price.stock.GOOG' :
                    this.GOOG = JSON.parse(message.body);
                    break;
                case '/topic/price.stock.YHOO' :
                    this.YHOO = JSON.parse(message.body);
                    break;
            }
            $scope.$apply();
        };
        let onAnnouncements = (message) => {
            notify(JSON.parse(message.body));
            this.getActiveUsers('stocks');
            this.selectedUser = 'All';
        };

        let onNotification = (message) => {
            let payload = JSON.parse(message.body);
            let body = payload.body || 'no message body';
            let title = payload.subject || 'Broadcast Notification';
            let id = payload.id || 'C42531110091071';
            let ttl = payload.ttl || 30000;
            growl.info(body +`<br> Go to <a href="#/calls/list/${id}">${id}</>` , {title,  ttl});
        };
        let onPrivateNotification = (message) => {
            let payload = JSON.parse(message.body);
            let body = payload.body || 'no message body';
            let title = payload.subject || 'Private Notification';
            let ttl = payload.ttl || -1;
            growl.warning(body , {title,  ttl});
        };

        $eventBus.registerHandler('/topic/chat/announcements.*', onAnnouncements);
        $eventBus.registerHandler('/topic/chat/messages', onMessage);
        $eventBus.registerHandler('/user/queue/chat/messages', (message)=> {onMessage(message,true);}); //private-messages
        $eventBus.registerHandler('/user/queue/chat/self', onMessage); //private-messages from server
        $eventBus.registerHandler('/user/queue/errors', onError);
        $eventBus.registerHandler('/topic/price.stock.*', onStockQuote);

        $eventBus.registerHandler('/topic/notifications.*', onNotification);
        $eventBus.registerHandler('/user/queue/notifications.*', onPrivateNotification);

        // Controller Destructor listener
        $scope.$on('$destroy', () => {
            $eventBus.publish('/app/chat/leave', 'Goodbye World');
            $eventBus.unregisterHandler('/topic/chat/announcements.*');
            $eventBus.unregisterHandler('/topic/chat/messages');
            $eventBus.unregisterHandler('/user/queue/chat/messages');
            $eventBus.unregisterHandler('/user/queue/chat/self');
            $eventBus.unregisterHandler('/user/queue/errors');
            $eventBus.unregisterHandler('/topic/price.stock.*');

//            $eventBus.unregisterHandler('/topic/notifications.*');
//            $eventBus.unregisterHandler('/user/queue/notifications.*');
        });

    }

    joinLeave(){
        if(this.joined) {
            this[_eventBus].publish('/app/chat/leave', 'Goodbye World');
            this.joined = false;
        } else {
            this[_eventBus].publish('/app/chat/join', 'Hello World');
            this.joined = true;
        }
    }

    getChatRooms() {
        this[_eventBus].send('/app/chat/rooms/'+'sumo').then( (rooms)=> {
            this[_scope].$apply( () => {
                this.rooms = rooms;
            });
        });
    }

    getActiveUsers(room){
        this[_eventBus].send('/app/chat/users/' +room).then( (users)=> {
            this[_scope].$apply( () => {
                this.users = users;
            });
        });
    }

    sendSelf(message){
        this[_eventBus].publish('/app/chat/self', message);
    }

    sendMessage(newMessage){
        if(this.selectedUser === 'All') {
            this[_eventBus].publish('/app/chat/messages', newMessage);
        } else {
            this.messages.push({message:`[ >> ${this.selectedUser}]: ${newMessage}`, private:true});
            this[_eventBus].publish(`/user/${this.selectedUser}/queue/chat/messages`, `[${this[_eventBus].getUser()}]: ${newMessage}`);
        }
        this.newMessage ='';
    };
}