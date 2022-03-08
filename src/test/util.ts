export const getRandomInt = (min, max): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const wait = async (ms) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}
