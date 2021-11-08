import {Writer} from "../writers/Writer";
import {ContextResolver} from "./ContextResolver";

export type BooleanResolver = {
	(): boolean;
}

export type Resolver = {
	(writer: Writer, type: string, context: ContextResolver): void;
}

export type StringResolver = {
	(element?: HTMLElement): string;
}

export type NumberResolver = {
	(element?: HTMLElement): number;
}