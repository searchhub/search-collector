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

