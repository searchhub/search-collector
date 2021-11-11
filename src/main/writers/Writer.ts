import {Context} from "../utils/Context";
import {StringResolver} from "../resolvers/Resolver";
import {TrailResolver} from "../query/TrailResolver";

export * from "./Base64EncodeWriter";
export * from "./BufferingWriter";
export * from "./DefaultWriter";
export * from "./JSONEnvelopeWriter";
export * from "./RestEventWriter";
export * from "./SplitStreamWriter";
export * from "./SQSEventWriter";

export interface Writer {
	write(data: any);
}

export type WriterOptions = {
	endpoint?: string,
	channel?: string,
	debug?: boolean,
	sqs?: boolean,
	context?: Context
	recordReferrer?: boolean,
	recordUrl?: boolean,
	resolver: WriterResolverOptions,
}
export type WriterResolverOptions = {
	sessionResolver: StringResolver,
	queryResolver: StringResolver,
	trailResolver?: TrailResolver
}