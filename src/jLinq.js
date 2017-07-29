var jLinq = (function() {
	return new Object({
		createCollection: function(array) {
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