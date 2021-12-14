import {Query, Trail, TrailType} from "../main";

describe('Test the Trail', () => {

	test('Trail test', () => {
		const resolverFactory = (...values) => {
			const results = values;
			let resultsCounter = 0;
			return () => {
				const q = new Query();
				q.setSearch(results[resultsCounter]);
				resultsCounter++;
				return q;
			}
		}
		const queryResolver = resolverFactory("phrase1", "phrase1");
		const trail = new Trail(queryResolver, () => "session");

		trail.register("1");
		trail.register("2");

		const trailData = trail.fetch("2");
		expect(trailData.query).toBe("$s=phrase1/");
	});

	test('Trail test with previous trail data', () => {
		const resolverFactory = (...values) => {
			const results = values;
			let resultsCounter = 0;
			return () => {
				const q = new Query();
				q.setSearch(results[resultsCounter]);
				resultsCounter++;
				return q;
			}
		}
		const queryResolver = resolverFactory("phrase1", undefined);
		const trail = new Trail(queryResolver, () => "session2");

		trail.register("1");
		trail.register("2", TrailType.Main, trail.fetch("1").query);

		const trailData = trail.fetch("2");
		expect(trailData.query).toBe("$s=phrase1/");
	});

});

