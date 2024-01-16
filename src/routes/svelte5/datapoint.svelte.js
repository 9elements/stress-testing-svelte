export class DataPoint {
	/** @type {Date} */
	time = $state(new Date());

	/** @type {number} */
	value = $state(0);

	/**
	 * @param {Date} time
	 * @param {number} value
	 */
	constructor(time, value) {
		this.time = time;
		this.value = value;
	}
}

export class DataPointStore {
	/**
	 * @type {DataPoint[]}
	 */
	points = $state([]);

	#counter = $state(100);

	/**
	 * @param {number} value
	 */
	addPoint(value) {
		const newIndex = (this.#counter += 1);

		this.points.push(new DataPoint(new Date(newIndex), value));

		if (this.points.length > 200) {
			this.points.shift();
		}
	}
}
