export interface Logger {
	debug(msg: string, ...dataArgs);

	info(msg: string, ...dataArgs);

	warn(msg: string, ...dataArgs);

	error(msg: string, ...dataArgs);
}