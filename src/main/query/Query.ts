/**
 * Parse and construct a new object representation of the query string form
 *
 * @param queryString the query string in the form of "/" joined criteria. ex. /brand=debut/price>100/
 * @returns
 */
export function Query(queryString) {
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
Query.prototype.toString = function () {
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
Query.prototype.addSelection = function (field, operation, value, value1, aggregation) {
	var agg = aggregation ? aggregation : "and";

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
 * Get back all selections
 *
 * @returns an array of all selections
 */
Query.prototype.getSelections = function () {
	return this.criteria;
}


Query.prototype.getSelection = function (field) {
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
Query.prototype.hasSelection = function (field) {
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
Query.prototype.hasExactSelection = function (field) {
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
Query.prototype.removeSelection = function (field) {
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
Query.prototype.removeSelectionAt = function (pos) {
	arrayRemove(this.criteria, pos, pos);
}

Query.prototype.setSearch = function (term) {
	this.removeSelection("$s");

	this.criteria.unshift({
		"field": "$s",
		"operation": "=",
		"value": term
	});
}

Query.prototype.getSearch = function () {
	var s = this.getSelection("$s");
	return s ? s.value : undefined;
}

Query.prototype.isValid = function () {
	return this.criteria.length > 0;
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
