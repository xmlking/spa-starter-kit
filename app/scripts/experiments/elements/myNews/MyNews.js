//import  templateString from 'text!../../../../scripts/experiments/elements/myNews/myNewsTemplate.html';
import  {loadDOMFromString, loadDOMFromLink} from '../../../common/utils/util';

export default class MyNews extends HTMLElement {
	createdCallback() {

		let root = this.createShadowRoot();

		let templatePromise = loadDOMFromLink('scripts/experiments/elements/myNews/myNewsTemplate.html');
		templatePromise.then( (template) => {

			let t = template.querySelector('#t');
			root.appendChild(t.content.cloneNode(true));
			let ticker = root.querySelector('#ticker');
			ticker.pseudo = 'x-ticker';

			var s = ticker.createShadowRoot();
			var u = template.querySelector('#u');
			s.appendChild(u.content.cloneNode(true));
		});

	}
}