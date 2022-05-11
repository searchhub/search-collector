import {WriterResolver} from "../resolvers/Resolver";
import {ListenerType} from "../utils/ListenerType";
import {Sentinel} from "../utils/Sentinel";
import {WriterResolverCollector} from "./WriterResolverCollector";

/**
 * Extends WriterResolverCollector and invokes the WriterResolverCollector#attach(writer, log)
 * when a click on an element for the provided "selectorExpression" occurs
 */
export class ClickWriterResolverCollector extends WriterResolverCollector {
	private readonly selectorExpression: string;
	private readonly listenerType: ListenerType;

	/**
	 *
	 * @param selectorExpression the css expression to query for other elements
	 * @param type the type of the event
	 * @param resolver a {WriterResolver} which will be executed as soon as an element matching the selectorExpression is clicked
	 * @param listenerType {ListenerType}
	 */
	constructor(selectorExpression: string, type: string, resolver: WriterResolver, listenerType: ListenerType = ListenerType.Sentinel) {
		super(type, resolver);
		this.selectorExpression = selectorExpression;
		this.listenerType = listenerType;
	}

	attach(writer, log) {
		const handler = (el, event) => {
			super.attach(writer, log);
		}

		if (this.listenerType === ListenerType.Dom) {
			const nodeList = this.getDocument().querySelectorAll(this.selectorExpression);
			nodeList.forEach(el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)(), {
				passive: true,
				capture: true
			}));
		} else {
			const sentinel = new Sentinel(this.getDocument());
			sentinel.on(this.selectorExpression, el => el.addEventListener("click", ev => this.logWrapHandler(handler, log, el, ev)(), {
				passive: true,
				capture: true
			}));
		}
	}
}
