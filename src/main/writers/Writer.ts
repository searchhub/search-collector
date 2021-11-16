import {Context} from "../utils/Context";
import {QueryResolver, StringResolver} from "../resolvers/Resolver";
import {Trail} from "../query/Trail";

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
	recordLanguage?: boolean,
	resolver: WriterResolverOptions,
}
export type WriterResolverOptions = {
	sessionResolver: StringResolver,
	queryResolver: QueryResolver,
	trail?: Trail
}