import {getLocalStorage} from "./Util";

export class LocalStorageQueue {
	name: string;
	queue: Array<any>;

	constructor(id) {
		this.name = "search-collector-queue" + (id ? "-" + id : "");
		this.queue = [];

		const storedQueue = getLocalStorage().getItem(this.name);
		if (storedQueue) {
			try {
				this.queue = JSON.parse(storedQueue);
			} catch (e) {
				console.error("Error parsing stored event queue " + e);
			}
		}
	}

	push(data) {
		this.queue.push(data);
		this._save();
	}

	drain() {
		const buffer = this.queue;
		this.queue = [];
		this._save();

		return buffer;
	}

	transactionalDrain(asyncCallback: (queue: Array<any>) => Promise<any>): Promise<any> {
		const buffer = this.queue;
		return asyncCallback(this.queue)
			.then(res => {
				this.queue = [];
				this._save();
				return buffer;
			});
	}

	size() {
		return this.queue.length;
	}

	private _save() {
		getLocalStorage().setItem(this.name, JSON.stringify(this.queue));
	}
}