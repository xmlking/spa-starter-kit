//import  templateString from 'text!../../../../scripts/experiments/elements/myElement/myElementTemplate.html';
import  {loadDOMFromString, loadDOMFromLink} from '../../../common/utils/util';
import {Diary} from 'diary/diary';

// a private properties used by the MyElement class
const _count = Symbol('count', true);
const _max = Symbol('max', true);

export default class MyElement extends HTMLElement {

	createdCallback(max = 10, startCount = 0) {

        this.logger =  Diary.logger('MyElement');
		this.max= this.getAttribute('max') || max;
		this[_count] = this.getAttribute('startCount') || startCount;
		this.innerHTML = `Using StartCount:<b>${this[_count]}</b> and Max: <b>${this[_max]}</b><br/>`;

		this.addEventListener('click', (e) => {
			this[_count]++;
            this.logger.info(`_count: ${this[_count]}`);
		});

		this.addEventListener('dblclick', (e) => {
            this.logger.info(`isMax: ${this.isMax}`);
		});

		// Create a ShadowDOM to hold our template content
		let root = this.createShadowRoot();

		// Load reusable template DOM
		//let importedDoc  = loadDOMFromString(templateString);
		let templatePromise = loadDOMFromLink('scripts/experiments/elements/myElement/myElementTemplate.html');
		templatePromise
			.then( (importedDoc) => {
				var myElementTemplate = importedDoc.querySelector('#my-element-template');

				{ //Repeat: Clone - Populate - Append //_(3).times( () => {}

					// 1. Clone the template DOM, Use cloneNode() if template is from same doc, otherwise use importNode()
					let clone = myElementTemplate.content.cloneNode(true);

					//TODO: 2. Populate content in template DOM.
					//Data binding?
					var model = {
						'Twitter': '@jdcravens',
						'Facebook': 'jesse.cravens',
						'LinkedIn': 'jessecravens',
						'Github': 'jessecravens'
					};

					myElementTemplate.model = model;

					// 3. Append the cloned DOM to Shadow root.
					// Appending a copy of the template content in this way makes it "live"
					root.appendChild(clone);
				}
			})
			.catch( (error) => {
				console.error(error);
			});
	}

	get isMax() {
		return this[_count] > this[_max];
	}

	// Likewise, "set" can be used to define setters.
	set max(value) {
		if (value < 0) {
			throw new Error('Max must be non-negative.');
		}
		this[_max] = value;
	}

	doStuff() {
	}

}