import {Query} from "../main";

describe('test the Query function', () => {
	test('basic evaluate', () => {
		const q = new Query("brand=adidas/color=red/");
		expect(q.toString()).toBe("brand=adidas/color=red/");
	});

	test('or value', () => {
		const q = new Query("brand=adidas;puma/color=red/");
		expect(q.toString()).toBe("brand=adidas;puma/color=red/");
	});

	test('and value', () => {
		const q = new Query("brand=adidas,puma/color=red/");
		expect(q.toString()).toBe("brand=adidas,puma/color=red/");
	});

	test('or', () => {
		const q = new Query("brand=adidas|category=shoes/color=red/");
		expect(q.toString()).toBe("brand=adidas|category=shoes/color=red/");
	});

	test('remove or', () => {
		const q = new Query("brand=adidas|category=shoes|type=falafel/color=red/");
		q.removeSelection("type");
		expect(q.toString()).toBe("brand=adidas|category=shoes/color=red/");
		q.removeSelection("brand");
		expect(q.toString()).toBe("category=shoes/color=red/");
	});

	test('add', () => {
		const q = new Query("brand=adidas");

		q.addSelection("color", "=", "red");
		expect(q.toString()).toBe("brand=adidas/color=red/");

		q.addSelection("category", "=", "shoes", undefined, "or");
		expect(q.toString()).toBe("brand=adidas/color=red/category=shoes/");

		q.addSelection("type", "=", "falafel", undefined, "or");
		expect(q.toString()).toBe("brand=adidas/color=red/category=shoes|type=falafel/");
	});

	test('remove at', () => {
		const q = new Query("brand=adidas|category=shoes|type=falafel/color=red/");

		q.removeSelectionAt(2);
		expect(q.toString()).toBe("brand=adidas|category=shoes/color=red/");

		q.removeSelectionAt(0);
		expect(q.toString()).toBe("category=shoes/color=red/");
	});
});