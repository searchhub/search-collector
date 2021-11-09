import {Util} from "./Util";

export class LocalStorageQueue {
	name: string;
	queue: Array<any>;

	constructor(id) {
		this.name = "search-collector-queue" + (id ? "-" + id : "");
		this.queue = [];

		const storedQueue = Util.getLocalStorage().getItem(this.name);
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

	size() {
		return this.queue.length;
	}

	private _save() {
		Util.getLocalStorage().setItem(this.name, JSON.stringify(this.queue));
	}
}