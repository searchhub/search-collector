import {Util} from "../utils/Util";

export const cookieResolver = (name: string = ""): string => Util.getCookie(name);