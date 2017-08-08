'use strict';

var jLinq = (function() {

	var Set = function(elements, comparer) {
		var _elements = elements.slice();
		var comparer = comparer;

		this.add = function(element) {
			if(!this.contains(element)) {
				_elements.push(element);
				return true;
			}

			return false;
		};

		this.contains = function(element) {
			for(let item of _elements) {
				if(comparer(element, item)) {
					return true;
				}
			}

			return false;
		};

		this.getElements = function() {
			return _elements.slice();
		};
	};

	var _throw = function(message) {
		throw new Error(message);
	};

	var isArray = function(array) {
		return Object.prototype.toString.call(array) == '[object Array]';
	};

	var isFunction = function(func) {
		return Object.prototype.toString.call(func) == '[object Function]';
	};

	/*
	 * Determines whether all elements of a sequence satisfy a
	 * condition.
	 * 
	 * @param {Function} predicate
	 * @return {Boolean} all
	 */
	Array.prototype.all = function(predicate) {
		try {
			return this.every(predicate);
		}
		catch(err) {
			_throw('Invalid predicate.');
		}
	};

	/*
	 * Determines whether any element of a sequence satisfies a
	 * condition. If no predicate is provided, then it returns
	 * whether the sequence contains any elements.
	 *
	 * @param {Function} predicate
	 * @return {Boolean} any
	 */
	Array.prototype.any = function(predicate) {
		try {
			return predicate === undefined ? this.length > 0 : this.some(predicate);
		}
		catch(err) {
			_throw('Invalid predicate.');
		}
	};

	/*
	 * Computes the average of a sequence of numeric values that
	 * are obtained by invoking a transform function on each
	 * element of the input sequence.
	 *
	 * @param {Function} selector
	 * @return {Number} average
	 */
	Array.prototype.average = function(selector) {
		try {
			return this.length ?
				[0].concat(this).reduce((x, y) => x + selector(y)) / this.length
				: _throw('The array is empty.');
		}
		catch(err) {
			if(err.message == 'The array is empty.') {
				throw err;
			}

			_throw('Invalid selector.');
		}
	};

	/*
	 * Determines whether a sequence contains a specified element
	 * by using a specified comparer.
	 *  
	 * @param {any} value
	 * @param {Function} comparer	 
	 * @returns {Boolean}
	 */
	Array.prototype.contains = function(value, comparer) {
		if(value === undefined) {
			_throw('Expected a value.');
		}

		else if(comparer !== undefined) {
			if(!isFunction(comparer)) {
				_throw('Invalid comparer.');
			}
		}

		else {
			comparer = (x, y) => x == y;
		}

		for(let item of this) {
			if(comparer(item, value)) {
				return true;
			}
		}

		return false;
	};

	/*
	 * Returns a number that represents how many elements in the
	 * specified sequence satisfy a condition. If no predicate
	 * is provided, then it returns de number of elements in the
	 * sequence.
	 * 
	 * @param {Function} predicate	 
	 * @return {Number} count
	 */
	Array.prototype.count = function(predicate) {
		if(predicate === undefined) {
			return this.length;
		}

		else if(!isFunction(predicate)) {
			_throw('Invalid predicate.');
		}

		return this.filter(predicate).length;
	};

	/*
	 * Returns the elements of the specified sequence or the specified value in
	 * a singleton collection if the sequence is empty. If the sequence is
	 * empty and no default value is provided, then it returns the sequence's
	 * type default value in a singleton collection.
	 * 
	 * @param {any} defaultValue	 
	 * @return {Array}
	 */
	Array.prototype.defaultIfEmpty = function(defaultValue) {
		if(defaultValue === undefined) {
			throw new Error('Expected a default value.');
		}

		return this.length == 0 ? [defaultValue] : this.copyWithin([]);
	};

	/*
	 * Returns distinct elements from a sequence by using a specified
	 * comparer to compare values. If no comparer is provided, it uses the
	 * default comparer.
	 * 
	 * @param {Function} comparer
	 * @return {Array}
	 */ 
	Array.prototype.distinct = function(comparer) {
		if(comparer === undefined) {
			comparer = (x, y) => x == y;
		}

		else if(!isFunction(comparer)) {
			_throw('Invalid comparer.');
		}

		var result = this.length ? [this[0]] : [];

		for(let item of this.slice(1)) {
			for(let distinct of result) {
				var insert = true;

				if(comparer(item, distinct)) {
					insert = false;
					break;
				}
			}

			insert && result.push(item);
		}

		return result;
	};

	/*
	 * Returns the element at a specified index.
	 *
	 * @param {Int} index
	 * @return {any}
	 */
	Array.prototype.elementAt = function(index) {
		if(index !== parseInt(index)) {
			_throw('Expected an integer.');
		}

		else if(index < 0 || index >= this.length) {
			_throw('Index is out of bounds.');
		}

		return this[index];
	}

	/*
	 * Produces the set difference of two sequences. If no comparer is provided
	 * then it uses the default comparer.
	 *
	 * @param {Array} array
	 * @param {Function} comparer
	 * @return {Array}
	 */
	Array.prototype.except = function(array, comparer) {
		if(!isArray(array)) {
			_throw('Expected an array.');
		}

		else if(comparer === undefined) {
			comparer = (x, y) => x == y;
		}

		else if(!isFunction(comparer)) {
			_throw('Invalid comparer.');
		}

		var set = new Set(array, comparer);
		var result = new Array();

		for(let item of this) {
			if(set.add(item)) {
				result.push(item);
			}
		}

		return result;
	}

	/*
	 * Returns the first element of a sequence. If a predicate is provided, it
	 * returns the first element that satisfies the condition.
	 *
	 * @parm {Function} predicate
	 * @return {any}
	 */
	Array.prototype.first = function(predicate) {
		try {
			var result = this.find(predicate || (x => x));

			return result || _throw('No elements satisfy the condition or the array is empty.');
		}
		catch(err) {
			if(err.message == 'No elements satisfy the condition or the array is empty.') {
				throw err;
			}

			_throw('Invalid predicate.');
		}
	}

	/*
	 * Returns a object that represents the value in the predicate
	 *
	 * @param {Function} predicate
	 * @return {Object} object
	 */
	Array.prototype.firstOrDefault = function(predicate) {
		if(predicate === undefined) {
            if(this.length>0) return this[0];
			return null;
		}

		else if(predicate !== undefined) {
			if ( this.length > 0)
				return this[0];
			else
				return null;
		}

		for(let i in this){
			if(predicate(this[i]) === true){
				return this[i];
			}
		}

		return null;
	};

	/*
	 * Produces the set intersection of two sequences. If no comparer is
	 * provided, it uses the default comparer.
	 *
	 * @param {Array} array
	 * @param {Function} comparer
	 * @return {Array}
	 */
	Array.prototype.intersect = function(array, comparer) {
		if(!isArray(array)) {
			_throw('Expected an array.');
		}

		else if(comparer === undefined) {
			comparer = (x, y) => x == y;
		}

		else if(!isFunction(comparer)) {
			_throw('Expected a function.');
		}

		var elements = new Set(array, comparer);
		var result = new Set([], comparer);

		for(let item of this) {
			if(elements.contains(item)) {
				result.add(item);
			}
		}

		return result.getElements();
	}

	/*
	 * Returns the last element of a sequence. If a predicate is provided, it
	 * returns the last element that satisfies the condition.
	 *
	 * @param {Function} predicate
	 * @return {any}
	 */
	Array.prototype.last = function(predicate) {
		if(!this.length) {
			_throw('No elements satisfy the condition or the array is empty.');
		}

		else if(predicate === undefined) {
			return this.slice(-1)[0];
		}

		else if(!isFunction(predicate)) {
			_throw('Invalid predicate.');
		}

		for(var i = this.length - 1; i >= 0; i--) {
			if(predicate(this[i])) {
				return this[i];
			}
		}

		_throw('No elements satisfy the condition or the array is empty.');
	}

	Array.prototype.lastOrDefault = function(predicate) {
		if(predicate === undefined) {
			if(this.length>0) return this[this.length-1];
			return null;
		}

		else if(predicate !== undefined) {
			if ( this.length > 0)
				return this[this.length-1];
			else
				return null;
		}

		for(let i in this){
			if(predicate(this[i]) === true){
				return this[i];
			}
		}

		return null;
	};

	Array.prototype.remove = function(predicate) {
        let result = [];
        for(let i in this){
            if(predicate(this[i]) !== true && !(this instanceof Function))
                result.push(this[i]);
        }

        return result;
    };

	/*
	 * Projects each element of a sequence into a new form.
	 *
	 * @param {Function} selector	 
	 * @return {Object} select
	 */
	Array.prototype.select = function(selector) {
		return this.map(selector);		
	};

	Array.prototype.selectMany = function(predicate) {
        let result = [];
        for(let i in this){
            if(predicate(this[i]) === true)
                result.push(this[i]);
        }

        return result;
    };

	/*
	 * Returns an object list that represents the value in the predicate
	 *
	 * @param {Function} predicate
	 * @return {Object} object list
	 */
	Array.prototype.where = function(predicate) {
		if(predicate === undefined) {
			return this.length;
		}

		else if(predicate !== undefined) {
			if(Object.prototype.toString.call(predicate) != '[object Function]') {
				throw new Error('Invalid predicate.');
			}
		}

		return this.filter(predicate);
	};
}());