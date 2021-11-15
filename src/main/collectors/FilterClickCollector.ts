import {ClickCollector} from "./ClickCollector";
import {StringResolver} from "../resolvers/Resolver";

/**
 * ClickCollector emitting "filter" events, attach to facet links
 */
export class FilterClickCollector extends ClickCollector {

	private readonly resolver: StringResolver;

	constructor(selector, collector) {
		super(selector, "filter");
		this.resolver = collector;
	}

	/**
	 * Collect the product click information from the element
	 * @override
	 */
	collect(element: HTMLElement, log) {
		return {query: this.resolve(this.resolver, log, element)};
	}
}