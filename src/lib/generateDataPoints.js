import { random } from 'lodash-es';

/**
 * @template T
 * @param {number} number
 * @param {(time: Date, value: number) => T} factory
 *
 * @returns {T[]}
 */
export const generateDataPoints = (number, factory) => {
	const maxNumber = 100 + number;

	const dataPoints = [];

	for (let index = 100; index < maxNumber; index++) {
		const value = random(50);
		const time = new Date(index);

		dataPoints.push(factory(time, value));
	}

	return dataPoints;
};
