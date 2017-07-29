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
				 * @return {Bool} all
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
				 * @return {Bool} any
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
				 * @return {number} average
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
				 * Projects each element of a sequence into a new form.
				 * 
				 * @param {function} selector
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