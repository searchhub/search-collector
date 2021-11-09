import {Writer} from "../writers/Writer";
import {Context} from "./Context";

export type CallbackResolver = (callback: (param: any) => void) => void;
export type WriterResolver = (writer: Writer, type: string, context: Context) => void
export type BooleanResolver = (element?: HTMLElement) => boolean;
export type StringResolver = (element?: HTMLElement) => string;
export type NumberResolver = (element?: HTMLElement) => number;