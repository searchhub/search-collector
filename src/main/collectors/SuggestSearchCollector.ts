import {WriterResolver} from "../resolvers/Resolver";
import {WriterResolverCollector} from "./WriterResolverCollector";


/**
 * Collect suggest search information - keyword searches coming from a suggestion widget/functionality
 */
export class SuggestSearchCollector extends WriterResolverCollector {
	/**
	 * Construct suggest search collector
	 *
	 * @constructor
	 * @param {function} resolver - Function that triggers the writing. Suggest might be complex, leave to the implementation to determine when/how
	 */
	constructor(resolver: WriterResolver) {
		super("suggest-search", resolver);
	}
}