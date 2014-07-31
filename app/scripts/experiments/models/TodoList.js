import Todo  from './TodoItem';
//import {values, keys} from '../../common/utils/Generators';
import {Generators} from '../../common/utils/Generators';
import {Inject} from 'di/index';
import {Diary} from 'diary/diary';

class TodoList {

	@Inject('sumoKeyGen')
	constructor(sumoKeyGen) {
		this.logger = Diary.logger('TodoList');
		this.keyGen = sumoKeyGen;
		// If Angular ng-repeat supported Maps, this could be a Map with integer keys.
		this.todos = {}; //new Map();
		this.length = 0; //map.size
	}

	add(text, done = false) {
		let todo = new Todo(text, done);
		let key = this.keyGen.next().value;
		this.todos[key] = todo;
		this.length++;
	}

	getTodo(key) {
		return this.todos[key];
	}

	allTodos() {
		return this.todos;
	}

	archiveCompleted() {
		// Not saving completed todos in this version.
		for (let todo of Generators.values(this.todos)) {
			if (todo.done) {
				//this.remove(todo);
				console.log('removing...', todo);
			}
		}
	}

	remove(key) {
		delete this.todos[key];
		this.length--;
	}

	getUncompletedCount() {
		// Unlike this.length, this must be recalculated because
		// AngularJS changes the done property in the Todo objects when checkboxes are checked.
		// If Traceur supported proxies, we could track changes to the done properties.
		let count = 0;
		for (let todo of Generators.values(this.todos)) {
			if (!todo.done) {
				count++;
			}
		}
		return count;
	}

	completed() {
		return this.todos.values().filter(todo => {
			return todo.done === true;
		});
	}

	remaining() {
		return this.todos.values().without(...this.completed());
	}

	clearAll() {
		for (let todo of Generators.keys(this.todos)) {
			this.remove(todo);
		}
		this.logger.info(`Reseting keyGen to : ${this.keyGen.next(true).value}`);
	}

}

export default TodoList;