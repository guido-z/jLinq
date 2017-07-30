var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('all tests', function() {
    it('Missing, null, or undefined predicate raises an exception', function() {
        var arr = [1, 2, 3];

        expect(() => arr.all()).to.throw('Invalid predicate.');
        expect(() => arr.all(null)).to.throw('Invalid predicate.');
        expect(() => arr.all(undefined)).to.throw('Invalid predicate.');
    });

    it('Search for true in an array of true values returns true', function() {
        var arr = [true, true, true];
        var result = arr.all(x => x === true);

        expect(result).to.equal(true);
    });

    it('Search for true in an array of mixed boolean values returns false', function() {
        var arr = [false, true, false];
        var result = arr.all(x => x === true);

        expect(result).to.equal(false);
    });

    it('Search for true in an array of false values returns false', function() {
        var arr = [false, false, false];
        var result = arr.all(x => x === true);

        expect(result).to.equal(false);
    });

    it('Determine if all numbers are even in an array filled with even numbers returns true', function() {
        var arr = [2, 4, 6, 8];
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(true);
    });

    it('Determine if all numbers are even in an array with both odd and even numbers returns false', function() {
        var arr = [1, 2, 3, 4, 5, 6];
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(false);
    });

    it('Determine if all numbers are even in an array filled with odd numbers returns false', function() {
        var arr = [1, 3, 5, 7, 9];
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(false);
    });

    it('Determine if all people in an object array are teenagers', function() {
        var arr = [
            {
                firstName: 'Oliver',
                lastName: 'Queen',
                age: 15
            },
            {
                firstName: 'Bruce',
                lastName: 'Wayne',
                age: 19
            },
            {
                firstName: 'Clark',
                lastName: 'Kent',
                age: 18
            }
        ];

        var result = arr.all(x => x.age >= 13 && x.age <= 19);

        expect(result).to.equal(true);
    });
});

describe('any tests', function() {
    describe('Parameterless overload', function() {
        it('Applying any on empty array returns false', function() {
            var arr = new Array();
            expect(arr.any()).to.equal(false);
        });

        it('Applying any on a non empty array returns true', function() {
            var arr = [1, 2, 3];
            expect(arr.any()).to.equal(true);
        });

        it('Applying any on an array with only one element returns true', function() {
            var arr = [0];
            expect(arr.any()).to.equal(true);
        });

        it('Applying any on an array with empty objects returns true', function() {
            var arr = [{}, {}];
            expect(arr.any()).to.equal(true);
        });
    });

    describe('Predicate overload', function() {
        it('Applying any to search for even numbers in an array filled with even numbers returns true', function() {
            var arr = [2, 4, 6, 8, 10];
            expect(arr.any(x => x % 2 == 0)).to.equal(true);
        });

        it('Applying any to search for even numbers in an array with al least one even number returns true', function() {
            var arr = [1, 2, 3, 4, 5];
            expect(arr.any(x => x % 2 == 0)).to.equal(true);
        });

        it('Applying any to search for even numbers in an array filled with odd numbers returns false', function() {
            var arr = [1, 3, 5, 7, 9];
            expect(arr.any(x => x % 2 == 0)).to.equal(false);
        });

        it('Search people by name', function() {
            var arr = [
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ];

            expect(arr.any(x => x.firstName == 'Clark')).to.equal(true);
            expect(arr.any(x => x.firstName == 'Oliver')).to.equal(false);
        });
    });
});

describe('average tests', function() {
    it('Missing, null, or undefined selector raises an exception', function() {
        var arr = [1, 2, 3, 4];
        expect(arr.average).to.throw('Invalid selector.');
    });

    it('Calculate the average of integers', function() {
        var arr = [1, 2, 3, 4];
        expect(arr.average(x => x)).to.equal(2.5);
    });

    it('Calculate the average of the lengths of arrays', function() {
        var arr = [
            [1],
            [2, 3],
            [4, 5, 6],
            [7, 8, 9, 10]
        ];

        expect(arr.average(x => x.length)).to.equal(2.5);
    });

    it('Calculate the average age of people', function() {
        var arr = [
            {
                firstName: 'Oliver',
                lastName: 'Queen',
                age: 15
            },
            {
                firstName: 'Bruce',
                lastName: 'Wayne',
                age: 17
            },
            {
                firstName: 'Clark',
                lastName: 'Kent',
                age: 16
            }
        ];

        expect(arr.average(x => x.age)).to.equal(16);
    });    
});

describe('contains tests', function() {
    describe('General tests', function() {
        it('Missing or undefined value raises an exception', function() {
            var arr = [1, 2 ,3];

            expect(arr.contains).to.throw('Expected a value.');
            expect(() => arr.contains(undefined)).to.throw('Expected a value.');
        });
    });

    describe('Default comparer tests', function() {
        it('Applying contains on an empty collection always returns false', function() {
            var arr = [];

            expect(arr.contains(null)).to.equal(false);            
            expect(arr.contains(1)).to.equal(false);
            expect(arr.contains('a')).to.equal(false);
            expect(arr.contains([1, 2, 3])).to.equal(false);
            expect(arr.contains({})).to.equal(false);                
        });

        it('If the passed value is the same as the only item in the array, contains returns true', function() {
            var arr = [1];
            expect(arr.contains(1)).to.equal(true);
        });

        it('If the passed value exists in the collection, contains returns true', function() {
            var arr = [1, 2];
            expect(arr.contains(1)).to.equal(true);
            expect(arr.contains(2)).to.equal(true);
        });

        it('If the passed value doesn\'t exist in a non empty collection, contains returns false', function() {
            var arr = [1, 2, 4];
            expect(arr.contains(3)).to.equal(false);
        });

        it('Searching for objects always returns false', function() {
            var arr = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ];

            var obj = {
                firstName: 'Clark',
                lastName: 'Kent'
            };

            expect(arr.contains(obj)).to.equal(false);
        });

        it('Searching for arrays always returns false', function() {
            var arr = [
                [1, 2, 3],
                [4, 5, 6]
            ];

            var value = [1, 2, 3];

            expect(arr.contains([1, 2, 3])).to.equal(false);
        });
    });

    describe('Custom comparer tests', function() {
        it('If comparer is not a function, contains throws an exception', function() {
            var arr = [1, 2, 3];

            expect(() => arr.contains(2, null)).to.throw('Invalid comparer.');            
            expect(() => arr.contains(2, 1)).to.throw('Invalid comparer.');            
            expect(() => arr.contains(2, '1')).to.throw('Invalid comparer.');            
            expect(() => arr.contains(2, {})).to.throw('Invalid comparer.');
            expect(() => arr.contains(2, [])).to.throw('Invalid comparer.');                        
        });

        it('Custom comparer allows to search for objects', function() {
            var arr = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ];

            var obj = {
                firstName: 'Clark',
                lastName: 'Kent'
            };

            var comparer = (x, y) => x.firstName == y.firstName && x.lastName == y.lastName;

            expect(arr.contains(obj, comparer)).to.equal(true);
        });

        it('Custom comparer allows to search for arrays', function() {
            var arr = [
                [1, 2, 3],
                [4, 5, 6]
            ];

            var value = [1, 2, 3];

            var comparer = function(x, y) {
                if(x.length != y.length) {
                    return false;
                }

                for(var i in x) {
                    if(x[i] != y[i]) {
                        return false;
                    }
                }

                return true;
            };
            
            expect(arr.contains([1, 2, 3], comparer)).to.equal(true);
        });
    });
});

describe('count tests', function() {
    describe('Calling count with no predicate', function() {
        it('Calling count on an empty array returns 0', function() {
            var arr = [];
            expect(arr.count()).to.equal(0);
        });

        it('Calling count on a one element array returns 1', function() {
            var arr = [1];
            expect(arr.count()).to.equal(1);
        });

        it('Calling count on a two element array returns 2', function() {
            var arr = [1, 2];
            expect(arr.count()).to.equal(2);
        });
    });

    describe('Calling count with predicate', function() {
        it('Calling count with an invalid predicate causes the function to throw an exception', function() {
            var arr = [1, 2 ,3];

            expect(() => arr.count(null)).to.throw('Invalid predicate.');
            expect(() => arr.count(1)).to.throw('Invalid predicate.');
            expect(() => arr.count('a')).to.throw('Invalid predicate.');
            expect(() => arr.count({})).to.throw('Invalid predicate.');
            expect(() => arr.count([])).to.throw('Invalid predicate.');
        });

        it('Count the even and odd numbers in an array', function() {
            var arr = [1, 2, 3, 4, 5];

            expect(arr.count(x => x % 2 == 0)).to.equal(2);
            expect(arr.count(x => x % 2 != 0)).to.equal(3);
        });

        it('Count how many people are named Clark', function() {
            var arr = [
                {
                    firstName: 'Oliver',
                    lastName: 'Queen'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent',
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                }
            ];

            expect(arr.count(x => x.firstName == 'Clark')).to.equal(1);
        });

        it('Count how many strings have a length of 5', function() {
            var arr = ['count', 'length', 'array', 'jLinq', 'object', 'JavaScript'];

            expect(arr.count(x => x.length == 5)).to.equal(3);
        });
    });
});

describe('select tests', function() {
    it('Return same elements in selector produces a clone of the original array', function() {
        var arr = [1, 2, 3];
        var result = arr.select(x => x);

        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('Return index in selector', function() {
        var arr = [1, 2, 3];
        var result = arr.select((x, i) => i);

        expect(result).to.deep.equal([0, 1, 2]);
    });

    it('Apply an operation inside the selector', function() {
        var arr = [1, 2, 3];
        var result = arr.select(x => x * 2);

        expect(result).to.deep.equal([2, 4, 6]);
    });

    it('Calculate the lengths of strings', function() {
        var arr = ['Linq', 'Testing', 'select', 'string'];
        var result = arr.select(x => x.length);

        expect(result).to.deep.equal([4, 7, 6, 6]);
    });

    it('Getting data from objects', function() {
        var arr = [
            {
                firstName: 'Bruce',
                lastName: 'Wayne',
                age: 32
            },
            {
                firstName: 'Clark',
                lastName: 'Kent',
                age: 51
            }
        ];

        var result = arr.select(x => x.firstName + ' ' + x.lastName);

        expect(result).to.deep.equal(['Bruce Wayne', 'Clark Kent']);
    });

    it('Chained select calls', function() {
        var arr = [1, 2, 3];
        var result = arr.select(x => x * 2).select(x => x + 1);

        expect(result).to.deep.equal([3, 5, 7]);
    });

    it('Chaining select calls equals to applying all operations in the same selector', function() {
        var arr = [1, 2, 3];
        var resultA = arr.select(x => x * 2).select(x => x + 1);
        var resultB = arr.select(x => (x * 2) + 1);

        expect(resultA).to.deep.equal(resultB);
    });
});

describe('Integration tests', function () {

});