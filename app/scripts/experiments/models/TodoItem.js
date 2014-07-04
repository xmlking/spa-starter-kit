export default class TodoItem {
	constructor(text, done = false) {
		this.text = text;
		this.done = done;
	}

	toggle() {
		this.done = !this.done;
	}

	toString() {
		return this.text;
	}

	//toggle = () => { this.completed = !this.completed };
}