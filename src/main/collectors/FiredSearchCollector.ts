import {WriterResolver} from "../resolvers/Resolver";
import {WriterResolverCollector} from "./WriterResolverCollector";

/**
 * Triggered when the client has triggered/fired a search
 *
 */
export class FiredSearchCollector extends WriterResolverCollector {
	/**
	 * Construct fired search collector
	 *
	 * @constructor
	 * @param {function} resolver - Function that triggers the writing. We can't always determine when search triggers, leave to the implementation to determine when/how
	 */
	constructor(resolver: WriterResolver) {
		super("fired-search", resolver);
	}
}