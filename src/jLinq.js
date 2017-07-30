var jLinq = (function() {

	/*
	 * Checks whether 'array' is a valid array.
	 * 
	 * @param {object Array} array
	 */
	var validateArray = function(array) {
		if(Object.prototype.toString.call(array) != '[object Array]') {
			throw new Error('Invalid collection.');
		}
	};

	return new Object({		
		createCollection: function(array) {
			validateArray(array);

			var innerArray = array;

			return new Object({
				/*
				 * For testing purposes, delete later.
				 */	
				toString: function() {
					return innerArray.join();
				},

				/*
				 * Returns the underlying array.
				 * 
				 *  @return {Object} innerArray
				 */ 				 
				toArray: function() {
					return innerArray;
				},

				/*
				 * Determines whether all elements of a sequence satisfy a
				 * condition.
				 * 
				 * @param {function} predicate
				 * @return {Boolean} all
				 */ 
				all: function(predicate) {
					if(!predicate) {
						throw new Error('Invalid predicate.');
					}

					for(var i in innerArray) {
						if(predicate(innerArray[i]) === false) {
							return false;
						}
					}

					return true;
				},

				/*
				 * Determines whether any element of a sequence satisfies a
				 * condition. If no predicate is provided, then it returns
				 * whether the sequence contains any elements.
				 * 
				 * @param {function} predicate
				 * @return {Boolean} any
				 */
				any: function(predicate) {
					if(!predicate) {
						return innerArray.length > 0;
					}
					
					for(var i in innerArray) {
						if(predicate(innerArray[i]) === true) {
							return true;
						}
					}

					return false;
				},

				/*
				 * Computes the average of a sequence of numeric values that
				 * are obtained by invoking a transform function on each
				 * element of the input sequence.
				 * 
				 * @param {function} selector
				 * @return {Number} average
				 */
				average: function(selector) {
					if(!selector) {
						throw new Error('Invalid selector.');
					}
					
					var sum = 0;

					for(let item of innerArray) {
						sum += selector(item);
					}

					return sum / innerArray.length;
				},

				/*
				 * Determines whether a sequence contains a specified element
				 * by using a specified comparer.
				 * 
				 * @param {any} value
				 * @param {Function} comparer
				 * 
				 * @returns {Boolean}
				 */
				contains: function(value, comparer) {					
					if(value === undefined) {
						throw new Error('Expected a value.');
					} 
					
					else if(comparer !== undefined) {
						if(Object.prototype.toString.call(comparer) != '[object Function]') {
							throw new Error('Invalid comparer.');
						}
					}

					else {
						comparer = (x, y) => x == y;
					}

					for(let item of innerArray) {
						if(comparer(item, value)) {
							return true;
						}
					}

					return false;
				},

				/*
				 * Concatenates two sequences. 'second' must be a valid
				 * array.
				 * 
				 * @param {Array} second				 
				 * @return {Array}
				 */				
				concat: function(second) {
					validateArray(second);
					return l(innerArray.concat(second));
				},

				/*
				 * Returns a number that represents how many elements in the
				 * specified sequence satisfy a condition. If no predicate
				 * is provided, then it returns de number of elements in the
				 * sequence.
				 * 
				 * @param {Function} predicate
				 * 
				 * @return {Number} count
				 */
				count: function(predicate) {
					if(predicate === undefined) {
						return innerArray.length;
					}

					else if(predicate !== undefined) {
						if(Object.prototype.toString.call(predicate) != '[object Function]') {
							throw new Error('Invalid predicate.');
						}
					}

					return innerArray.filter(predicate).length;
				},

				/*
				 * Projects each element of a sequence into a new form.
				 * 
				 * @param {Function} selector
				 * @return {Object} select
				 */
				select: function(selector) {
					if(!selector) {
						throw new Error('Invalid selector.');
					}
					
					var result = innerArray.map((x, i) => selector(x, i));
					return l(result);			
				},
            });
        }
    });
}());

var l = jLinq.createCollection;