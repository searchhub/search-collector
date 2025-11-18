import {AbstractCollector} from "./AbstractCollector";
import {WriterResolver} from "../resolvers/Resolver";


/**
 * Resolves immediately and passing the writer, the type of the event + context to the provided resolver function.
 */
export class WriterResolverCollector extends AbstractCollector {
  protected readonly resolver: WriterResolver;

  constructor(type: string, resolver: WriterResolver) {
    super(type);
    this.resolver = resolver;
  }

  attach(writer, log) {
    this.resolve(this.resolver, log, writer, this.getType(), this.getContext());
  }
}