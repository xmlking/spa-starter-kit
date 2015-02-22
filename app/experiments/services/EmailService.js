import {Diary} from 'diary';

export default class EmailService {

	constructor() {
        this.logger = Diary.logger('EmailService');
        this.logger.info('in EmailService....');

		this.content = '';
	}

	async send(recipient) {
        this.logger.info('before await....');
		await this.timeout(1000);
        this.logger.info('after await....');
		return `sending  ${this.content} to ${recipient} ...`;
	}

	timeout(ms) : Promise {
		/*global resolve:false */
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

    static format (name : string = "Anonymous") : string {
        return name.toUpperCase();
    }

    static add(a: number, b: number): number {
        return a + b;
    }
}
