import {Injector} from 'di/index';
import TodoList from '../models/TodoList';
import {keyGenerator} from '../../common/utils/generators';

export default class TodoController {

	constructor($scope, growl) {

        let injector = new Injector([keyGenerator]);
        this.todos = injector.get(TodoList);
        this.todos.add('learn AngularJS', true);
        this.todos.add('build an AngularJS app');
        this.newTodo = '';
        this.growl = growl;
    }

    addTodo() {
        this.todos.add(this.newTodo, false);
        this.growl.info(`${this.newTodo} ... added`, {ttl: 3000});
        this.newTodo = ''; // clears input
    }

    removeTodo(key) {
        let anItem = this.todos.getTodo(key);
        this.growl.warning(`${anItem.text} ... removed`, {ttl: 3000});
        this.todos.remove(key);
    }

    clearAll() {
        this.todos.clearAll();
        this.growl.error('All Clear', {ttl: 3000});
    }

    completed() {
        return this.todos.completed();
    }

    remaining() {
        return this.todos.remaining();
    }

}


