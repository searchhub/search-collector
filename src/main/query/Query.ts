export class Query {
	criteria: Array<any>;

	constructor(queryString?: string) {
		this.criteria = [];
		var self = this;

		if (queryString) {
			var criteria = [];
			var ands = queryString.split("/");
			ands.forEach(function (and) {
				if (and.indexOf("|") != -1) {
					var ors = and.split("|");
					ors.forEach(function (or) {
						criteria.push({"selection": or, "type": "or"});
					});
				} else {
					criteria.push({"selection": and, "type": "and"});
				}
			});

			criteria.forEach(function (criterion) {
				var c = unescape(criterion.selection);

				if (c.indexOf("=") != -1) {
					var valueSplit = c.split("=");
					self.criteria.push({
						"field": valueSplit[0],
						"operation": "=",
						"value": valueSplit[1],
						"aggregation": criterion.type
					});
				} else if (c.indexOf("<") != -1) {
					var valueSplit = c.split("<");

					if (2 == valueSplit.length) {
						self.criteria.push({
							"field": valueSplit[0],
							"operation": "<",
							"value": valueSplit[1],
							"aggregation": criterion.type
						});
					} else if (3 == valueSplit.length) {
						self.criteria.push({
							"field": valueSplit[1],
							"operation": "><",
							"lowerValue": valueSplit[0],
							"upperValue": valueSplit[2],
							"aggregation": criterion.type
						});
					}
				} else if (c.indexOf(">") != -1) {
					var valueSplit = c.split(">");

					if (2 == valueSplit.length) {
						self.criteria.push({
							"field": valueSplit[0],
							"operation": ">",
							"value": valueSplit[1],
							"aggregation": criterion.type
						});
					} else if (3 == valueSplit.length) {
						self.criteria.push({
							"field": valueSplit[1],
							"operation": "><",
							"lowerValue": valueSplit[2],
							"upperValue": valueSplit[1],
							"aggregation": criterion.type
						});
					}
				}
			});
		}
	}

	/**
	 * Put back to string the query object
	 *
	 * @returns a string in the form of /brand=debut/price>100/
	 */
	toString(): string {
		var result = "";

		for (var i = 0; i < this.criteria.length; i++) {
			var criterion = this.criteria[i];
			var separator = "/";

			if ("or" == criterion.aggregation) {
				var next = this.criteria[i + 1];
				if (next && "or" == next.aggregation) {
					separator = "|";
				}
			}

			if (criterion.operation == "><") {
				result += criterion.lowerValue + "<" + criterion.field + "<" + criterion.upperValue + separator;
			} else {
				result += criterion.field + criterion.operation + criterion.value + separator;
			}
		}
		return result;
	}

	/**
	 * Add a selection to this query.
	 *
	 * @param field the name of the field we're drilling down with
	 * @param operation the operation, ex =,>,<
	 * @param value the value for the operation
	 * @param value1 optional second value for constructing ranges like 100<price<200
	 */
	addSelection(field, operation, value, value1?, aggregation?) {
		const agg = aggregation ? aggregation : "and";
		if (value1 && "><" == operation) {
			this.criteria.push({
				"field": field,
				"operation": "><",
				"lowerValue": value,
				"upperValue": value1,
				"aggregation": agg
			});
		} else {
			this.criteria.push({
				"field": field,
				"operation": operation,
				"value": value,
				"aggregation": agg
			});
		}

	}

	/**
	 * Parse and construct a new object representation of the query string form
	 *
	 * @param queryString the query string in the form of "/" joined criteria. ex. /brand=debut/price>100/
	 * @returns
	 */
	getSelections() {
		return this.criteria;
	}

	getSelection(field) {
		for (var c in this.criteria) {
			var crit = this.criteria[c];
			if (crit.field == field) {
				return crit;
			}
		}

		return undefined;
	}

	/**
	 * Check if this query already has a selection for the given field
	 *
	 * @returns true if we have a selection of this field, false otherwise
	 */
	hasSelection(field) {
		for (var c in this.criteria) {
			var crit = this.criteria[c];
			if (crit.field == field) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check if this query already has a selection for the given field
	 *
	 * @returns true if we have a selection of this field, false otherwise
	 */
	hasExactSelection(field) {
		for (var c in this.criteria) {
			var crit = this.criteria[c];
			if (crit.field == field && crit.operation == "=") {
				return true;
			}
		}
		return false;
	}


	/**
	 * Remove all selections on this field
	 */
	removeSelection(field) {
		var criteria = [];
		for (var i = 0; i < this.criteria.length; i++) {
			var crit = this.criteria[i];

			if (crit.field == field) {
				criteria.push(i);
			}
		}

		while (criteria.length > 0) {
			var c = criteria.pop();
			arrayRemove(this.criteria, c, c);
		}

		for (var i = 0; i < this.criteria.length; i++) {
			var current = this.criteria[i];
			var previous = this.criteria[i - 1];
			var next = this.criteria[i + 1];

			if ("or" == current.aggregation) {
				if ((!next || "and" == next.aggregation) && (!previous || "and" == previous.aggregation)) {
					current.aggregation = "and";
				}
			}
		}
	}

	/**
	 * Remove all selections on this field
	 */
	removeSelectionAt = function (pos) {
		arrayRemove(this.criteria, pos, pos);
	}

	setSearch(term) {
		this.removeSelection("$s");

		this.criteria.unshift({
			"field": "$s",
			"operation": "=",
			"value": term
		});
	}

	getSearch() {
		var s = this.getSelection("$s");
		return s ? s.value : undefined;
	}

	isValid() {
		return this.criteria.length > 0;
	}

}


/**
 * We have the same function in util but we want to have query.js without any dependencies
 *
 * @param array
 * @param from
 * @param to
 * @returns {Number|*}
 */
function arrayRemove(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
}
