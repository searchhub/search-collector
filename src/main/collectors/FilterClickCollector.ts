import {ClickCollector} from "./ClickCollector";

/**
 * ClickCollector emitting "filter" events, attach to facet links
 */
export class FilterClickCollector extends ClickCollector {

	collector;

	constructor(selector, collector) {
		super(selector, "filter");
		this.collector = collector;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element: HTMLElement) {
		return {"query": this.collector(element)};
	}
}