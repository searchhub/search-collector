import {Context} from "../utils/Context";
import {StringResolver} from "../resolvers/Resolver";
import {TrailResolver} from "../query/TrailResolver";

export interface Writer {
	write(data: any);
}

export type WriterOptions = {
	endpoint: string,
	channel: string,
	recordReferrer: boolean,
	recordUrl: boolean,
	debug?: boolean,
	sqs?: boolean,
	context?: Context
	resolver: WriterResolverOptions,
}
export type WriterResolverOptions = {
	sessionResolver: StringResolver,
	queryResolver: StringResolver,
	trailResolver: TrailResolver
}