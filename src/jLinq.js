var jLinq = (function() {
	return new Object({
		createCollection: function(array) {
			var innerArray = array;

			return new Object({
				toString: function() {
					return innerArray.join();
				},

				toArray: function() {
					return innerArray;
				},

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

				any:function(predicate) {
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

				select: function(selector) {
					if(!selector) {
						throw new Error('Invalid selector.');
					}

					var result = new Array();

					for(var i in innerArray) {
						result.push(selector(innerArray[i], i));
                    }

					return l(result);
				},
            });
        }
    });
}());

var l = jLinq.createCollection;