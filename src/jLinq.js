'use strict';

var jLinq = (function() {

	/*
	 * Determines whether all elements of a sequence satisfy a
	 * condition.
	 * 
	 * @param {Function} predicate
	 * @return {Boolean} all
	 */ 
	Array.prototype.all = function(predicate) {
		if(!predicate) {
			throw new Error('Invalid predicate.');
		}

		for(let item of this) {
			if(predicate(item) === false) {
				return false;
			}
		}

		return true;
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
		if(!predicate) {
			return this.length > 0;
		}
		
		for(let item of this) {
			if(predicate(item) === true) {
				return true;
			}
		}

		return false;
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
		if(selector === undefined) {
			throw new Error('Invalid selector.');
		}

		else if(Object.prototype.toString.call(selector) != '[object Function]') {			
			throw new Error('Invalid selector.');			
		}
		
		return [0].concat(this).reduce((x, y) => x + selector(y)) / this.length;		
	};

	/*
	 * Determines whether a sequence contains a specified element
	 * by using a specified comparer.
	 *  
	 * @param {any} value
	 * @param {Function} comparer
	 * 
	 * @returns {Boolean}
	 */
	Array.prototype.contains = function(value, comparer) {					
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
	 * 
	 * @return {Number} count
	 */
	Array.prototype.count = function(predicate) {
		if(predicate === undefined) {
			return this.length;
		}

		else if(predicate !== undefined) {
			if(Object.prototype.toString.call(predicate) != '[object Function]') {
				throw new Error('Invalid predicate.');
			}
		}

		return this.filter(predicate).length;
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
}());