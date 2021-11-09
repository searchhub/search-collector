import {AbstractCollector} from "./AbstractCollector";
import {WriterResolver} from "../resolvers/Resolver";


/**
 * Collect suggest search information - keyword searches coming from a suggestion widget/functionality
 */
export class SuggestSearchCollector extends AbstractCollector {

	resolver: WriterResolver;

	/**
	 * Construct suggest search collector
	 *
	 * @constructor
	 * @param {function} resolver - Function that triggers the writing. Suggest might be complex, leave to the implementation to determine when/how
	 */
	constructor(resolver: WriterResolver) {
		super("suggest-search");
		this.resolver = resolver;
	}

	/**
	 * Attach a writer, note that this collector is not asynchronous and will write
	 * the data immediatelly
	 *
	 * @param {object} writer - The writer to send the data to
	 */
	attach(writer) {
		this.resolver(writer, this.getType(), this.getContext());
	}
}