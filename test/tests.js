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

        expect(() => arr.average()).to.throw('Invalid selector.');
        expect(() => arr.average(null)).to.throw('Invalid selector.');
        expect(() => arr.average(1)).to.throw('Invalid selector.');
        expect(() => arr.average('selector')).to.throw('Invalid selector.');
        expect(() => arr.average({})).to.throw('Invalid selector.');
        expect(() => arr.average([])).to.throw('Invalid selector.');
    });

    it('Calling average with an empty array causes the function to throw an exception', function() {
        var arr = [];
        
        expect(() => arr.average(x => x)).to.throw('The array is empty.');
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

describe('defaultIfEmpty tests', function() {
    it('If no default value is provided, defaultIfEmpty throws an exception', function() {
        var arr = [];
        expect(() => arr.defaultIfEmpty()).to.throw('Expected a default value.');

        arr = [1, 2, 3];
        expect(() => arr.defaultIfEmpty()).to.throw('Expected a default value.');
    });

    it('If the array is empty, defaultIfEmpty returns a singleton array with the default value.', function() {
        var arr = [];

        var result = arr.defaultIfEmpty(null);
        expect(result.length).to.equal(1);
        expect(result[0]).to.equal(null);

        result = arr.defaultIfEmpty(1);
        expect(result.length).to.equal(1);
        expect(result[0]).to.equal(1);

        result = arr.defaultIfEmpty('a');
        expect(result.length).to.equal(1);
        expect(result[0]).to.equal('a');

        result = arr.defaultIfEmpty({});
        expect(result.length).to.equal(1);
        expect(result[0]).to.deep.equal({});

        result = arr.defaultIfEmpty([]);
        expect(result.length).to.equal(1);
        expect(result[0]).to.deep.equal([]);
    });

    it('If the array is not empty, defaultIfEmpty returns a copy of the array', function() {
        var arr = [1, 2, 3];

        expect(arr.defaultIfEmpty(0)).to.not.equal([1, 2, 3]);
        expect(arr.defaultIfEmpty(0)).to.deep.equal([1, 2, 3]);
    });
});

describe('distinct tests', function() {
    describe('Default comparer tests', function() {
        it('Applying distinct on an empty array returns a new empty array', function() {
            var arr = [];

            expect(arr.distinct()).to.not.equal(arr);
            expect(arr.distinct()).to.deep.equal([]);
        });

        it('Applying distinct on a one element array returns a new array with the same element', function() {
            var arr = [1];

            expect(arr.distinct()).to.not.equal(arr);
            expect(arr.distinct()).to.deep.equal([1]);
        });

        it('Applying distinct on an array with different elements returns a new array with the same elements', function() {
            var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

            expect(arr.distinct()).to.not.equal(arr);
            expect(arr.distinct()).to.deep.equal(arr);
        });

        it('Applying distinct on on array with repeated elements filters out the duplicates', function() {
            var arr = [1, 2, 1, 3];
            expect(arr.distinct()).to.deep.equal([1, 2, 3]);

            arr = [1, 1, 1, 1, 1];
            expect(arr.distinct()).to.deep.equal([1]);

            arr = [1, 1, 1, 2, 2, 2, 3];
            expect(arr.distinct()).to.deep.equal([1, 2, 3]);
        });

        it('Applying distinct on an array of objects with the default comparer\
            always returns a new array with the same elements', function() {
            var arr = [
                { firstName: 'Clark', lastName: 'Kent' },
                { firstName: 'Clark', lastName: 'Kent' },
                { firstName: 'Clark', lastName: 'Kent' }
            ];

            expect(arr.distinct()).to.not.equal(arr);
            expect(arr.distinct()).to.deep.equal(arr);
        });

        it('Applying distinct on an array of arrays with the default comparer\
            always returns a new array with the same elements', function() {
            var arr = [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3]
            ];

            expect(arr.distinct()).to.not.equal(arr);
            expect(arr.distinct()).to.deep.equal(arr);
        });
    });

    describe('User defined comparer tests', function() {
        it('Passing an invalid comparer causes distinct to throw an exception', function() {
            var arr = [1, 2, 3];

            expect(() => arr.distinct(null)).to.throw('Invalid comparer.');
            expect(() => arr.distinct(1)).to.throw('Invalid comparer.');
            expect(() => arr.distinct('a')).to.throw('Invalid comparer.');
            expect(() => arr.distinct({})).to.throw('Invalid comparer.');
            expect(() => arr.distinct([])).to.throw('Invalid comparer.');
        });

        it('Filter out objects with the same properties and values', function() {
            var arr = [
                { firstName: 'Clark', lastName: 'Kent' },
                { firstName: 'Clark', lastName: 'Kent' },
                { firstName: 'Clark', lastName: 'Kent' }
            ];

            var comparer = (x, y) => x.firstName == y.firstName && x.lastName == y.lastName;

            expect(arr.distinct(comparer).length).to.equal(1);
            expect(arr.distinct(comparer)[0]).to.equal(arr[0]);
        });

        it('Get one person object for each age', function() {
            var arr = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent',
                    age: 21
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                    age: 25
                },
                {
                    firstName: 'Arthur',
                    lastName: 'Curry',
                    age: 25
                },
                {
                    firstName: 'Barry',
                    lastName: 'Allen',
                    age: 21
                },
                {
                    firstName: 'Oliver',
                    lastName: 'Queen',
                    age: 30
                }
            ];

            var result = arr.distinct((x, y) => x.age == y.age);

            expect(result.length).to.equal(3);
            expect(result[0]).to.equal(arr[0]);
            expect(result[1]).to.equal(arr[1]);
            expect(result[2]).to.equal(arr[4]);
        });
    });
});

describe('elementAt tests', function() {
    it('Passing a non integer index causes the function to throw an exception', function() {
        var arr = [1, 2, 3];

        expect(() => arr.elementAt()).to.throw('Expected an integer.');
        expect(() => arr.elementAt(null)).to.throw('Expected an integer.');
        expect(() => arr.elementAt(1.5)).to.throw('Expected an integer.');
        expect(() => arr.elementAt('index')).to.throw('Expected an integer.');
        expect(() => arr.elementAt({})).to.throw('Expected an integer.');
        expect(() => arr.elementAt([])).to.throw('Expected an integer.');
    });

    it('Passing an out of bounds index causes the function to throw an exception.', function() {
        var arr = [1, 2, 3];

        expect(() => arr.elementAt(-1)).to.throw('Index is out of bounds.');
        expect(() => arr.elementAt(3)).to.throw('Index is out of bounds.');

        arr = [];

        expect(() => arr.elementAt(-1)).to.throw('Index is out of bounds.');
        expect(() => arr.elementAt(0)).to.throw('Index is out of bounds.');
        expect(() => arr.elementAt(1)).to.throw('Index is out of bounds.');
    });

    it('Passing \'length - 1\' as index causes the function to return the last element', function() {
        var arr = [1, 2, 3];

        expect(arr.elementAt(arr.length - 1)).to.equal(3);
    });

    it('Passing a valid index causes the function to return the correct value', function() {
        var arr = new Array();

        // Fill array with numbers from 0 to 1000.
        for(var i = 0; i <= 1000; i++) {
            arr.push(i);
        }

        for(var i = 0; i < arr.length; i++) {
            expect(arr.elementAt(i)).to.equal(arr[i]);
        }
    });

    it('Calling elementAt on an array of objects returns the actual object in the selected position', function() {
        var arr = [
            {
                firstName: 'Clark',
                lastName: 'Kent'
            },
            {
                firstName: 'Bruce',
                lastName: 'Wayne'
            }
        ];

        expect(arr.elementAt(0)).to.equal(arr[0]);
        expect(arr.elementAt(1)).to.equal(arr[1]);
    });
});

describe('except tests', function() {
    describe('Default comparer tests', function() {
        it('Calling except with an invalid second array causes the funcion to throw an exception', function() {
            var arr1 = [1, 2, 3];

            expect(() => arr1.except()).to.throw('Expected an array.');
            expect(() => arr1.except(null)).to.throw('Expected an array.');
            expect(() => arr1.except(1)).to.throw('Expected an array.');
            expect(() => arr1.except('array')).to.throw('Expected an array.');
            expect(() => arr1.except({})).to.throw('Expected an array.');
        });

        it('Calling except with two empty arrays returns an empty array', function() {
            var arr1 = [];
            var arr2 = [];

            expect(arr1.except(arr2)).to.deep.equal([]);
        });

        it('Calling except with an empty first array returns an empty array', function() {
            var arr1 = [];
            var arr2 = [4, 5, 6];

            expect(arr1.except(arr2)).to.not.equal(arr1);
            expect(arr1.except(arr2)).to.deep.equal([]);
        });

        it('Calling except with an empty second array returns a copy of the first array', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [];

            expect(arr1.except(arr2)).to.deep.equal(arr1);
        });

        it('If both arrays have the same elements, except returns an empty array', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [1, 2, 3];

            expect(arr1.except(arr2)).to.deep.equal([]);
        });

        it('Except removes duplicates from the first array', function() {
            var arr1 = [1, 1, 2, 3, 1];
            var arr2 = [4, 5, 6];

            expect(arr1.except(arr2)).to.deep.equal([1, 2, 3]);
        });

        it('Calling except with arrays of objects returns a new array with the elements of the first array', function() {
            var arr1 = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                }
            ];

            var arr2 = [
                {
                    firstName: 'Barry',
                    lastName: 'Allen'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ];

            var result = arr1.except(arr2);

            expect(result.length).to.equal(2);
            expect(result[0]).to.equal(arr1[0]);
            expect(result[1]).to.equal(arr1[1]);
        });

        it('Calling except with the same array as parameter returns an empty array', function() {
            var arr = [1, 2, 3];

            expect(arr.except(arr)).to.deep.equal([]);
        });

        it('Numeric array tests', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [1, 3];

            expect(arr1.except(arr2)).to.deep.equal([2]);
            expect(arr2.except(arr1)).to.deep.equal([]);


            arr1 = [1, 1, 1];
            arr2 = [1];

            expect(arr1.except(arr2)).to.deep.equal([]);
            expect(arr2.except(arr1)).to.deep.equal([]);


            arr1 = [1, 2, 3];
            arr2 = [4, 5, 6];

            expect(arr1.except(arr2)).to.deep.equal(arr1);
            expect(arr2.except(arr1)).to.deep.equal(arr2);
        });
    });

    describe('Custom comparer tests', function() {
        it('Passing an invalid comparer causes the function to throw an exception', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [4, 5, 6];

            expect(() => arr1.except(arr2, null)).to.throw('Invalid comparer.');
            expect(() => arr1.except(arr2, 1)).to.throw('Invalid comparer.');
            expect(() => arr1.except(arr2, 'comparer')).to.throw('Invalid comparer.');
            expect(() => arr1.except(arr2, {})).to.throw('Invalid comparer.');
            expect(() => arr1.except(arr2, [])).to.throw('Invalid comparer.');
        });

        it('Calling except with arrays of object using a custom comparer returns the expected result', function() {
            var arr1 = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                }
            ];

            var arr2 = [
                {
                    firstName: 'Barry',
                    lastName: 'Allen'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ];

            var comparer = (x, y) => x.firstName == y.firstName && x.lastName == y.lastName;
            var result = arr1.except(arr2, comparer);
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(arr1[1]);
        });
    });
});

describe('first tests', function() {
    describe('Calling first with no predicate', function() {
        it('Calling first on an empty array causes the function to throw an exception', function() {
            var arr = [];

            expect(() => arr.first()).to.throw('No elements satisfy the condition or the array is empty.');
        });

        it('Calling first on a one element array returns the only element', function() {
            var arr = [1];

            expect(arr.first()).to.equal(1);
        });

        it('Calling first on an array of object returns the first object', function() {
            var arr = [
                { value: 1 },
                { value: 2 },
                { value: 3 }
            ];

            expect(arr.first()).to.equal(arr[0]);
        });

        it('Calling first on an array of strings', function() {
            var arr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

            expect(arr.first()).to.equal('first');
        });
    });

    describe('Calling first with predicate', function() {
        it('Passing an invalid predicate causes the function to throw an exception', function() {
            var arr = [1, 2, 3];

            // expect(() => arr.first(null)).to.throw('Invalid predicate.');
            expect(() => arr.first(1)).to.throw('Invalid predicate.');
            expect(() => arr.first('predicate')).to.throw('Invalid predicate.');
            expect(() => arr.first({})).to.throw('Invalid predicate.');
            expect(() => arr.first([])).to.throw('Invalid predicate.');
        });

        it('Calling first on an empty array causes the function to throw an exception', function() {
            var arr = [];

            expect(() => arr.first(x => x)).to.throw('No elements satisfy the condition or the array is empty.');
        });

        it('If no elements satisfy the predicate condition, first throws an exception', function() {
            var arr = [1, 2, 3];

            expect(() => arr.first(x => x > 3)).to.throw('No elements satisfy the condition or the array is empty.');
        });

        it('Other tests', function() {
            var arr = [1, 2, 3, 4];

            expect(arr.first(x => x > 3)).to.equal(4);


            arr = [
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                },
                {
                    firstName: 'Barry',
                    lastName: 'Allen'
                },
                {
                    firstName: 'Oliver',
                    lastName: 'Queen'
                }
            ];

            expect(arr.first(x => x.firstName + ' ' + x.lastName == 'Barry Allen')).to.equal(arr[2]);
        });
    });
});

describe('intersect tests', function() {
    describe('Default comparer tests', function() {
        it('Passing an invalid array causes the function to throw an exception', function() {
            var arr1 = [1, 2, 3];

            expect(() => arr1.intersect()).to.throw('Expected an array.');
            expect(() => arr1.intersect(undefined)).to.throw('Expected an array.');
            expect(() => arr1.intersect(null)).to.throw('Expected an array.');
            expect(() => arr1.intersect(0)).to.throw('Expected an array.');
            expect(() => arr1.intersect('array')).to.throw('Expected an array.');
            expect(() => arr1.intersect(false)).to.throw('Expected an array.');
            expect(() => arr1.intersect({})).to.throw('Expected an array.');
        });

        it('Intersection between two empty arrays is an empty array', function() {
            var arr1 = [];
            var arr2 = [];

            expect(arr1.intersect(arr2)).to.not.equal(arr1);
            expect(arr1.intersect(arr2)).to.not.equal(arr2);
            expect(arr1.intersect(arr2)).to.deep.equal([]);
        });

        it('Intersection between an empty array and a non empty array is an empty array', function() {
            var arr1 = [];
            var arr2 = [4, 5, 6];

            expect(arr1.intersect(arr2)).to.not.equal(arr1);
            expect(arr1.intersect(arr2)).to.deep.equal([]);
        });

        it('Intersection between a non empty array and an empty array is an empty array', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [];

            expect(arr1.intersect(arr2)).to.not.equal(arr2);
            expect(arr1.intersect(arr2)).to.deep.equal([]);
        });

        it('Intersection between two non empty arrays that do not have common elements is an empty array', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [4, 5, 6];

            expect(arr1.intersect(arr2)).to.deep.equal([]);
        });

        it('Intersection between two non empty arrays that have one common element is a one element array', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [3, 4, 5];

            expect(arr1.intersect(arr2)).to.deep.equal([3]);
        });

        it('Intersection between two arrays that have the same elements is a copy of the arrays', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [1, 2, 3];

            expect(arr1.intersect(arr2)).to.not.equal(arr1);
            expect(arr1.intersect(arr2)).to.not.equal(arr2);
            expect(arr1.intersect(arr2)).to.deep.equal(arr1);
        });

        it('The result of intersect does not include duplicate elements', function() {
            var arr1 = [1, 1, 2, 3];
            var arr2 = [4, 5, 1];

            expect(arr1.intersect(arr2)).to.deep.equal([1]);

            arr1 = [1, 2, 1, 2, 3];
            arr2 = [4, 5, 1, 2, 1];

            expect(arr1.intersect(arr2)).to.deep.equal([1, 2]);
        });

        it('Other intersect tests', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [1, 4, 5];
            expect(arr1.intersect(arr2)).to.deep.equal([1]);


            arr2 = [4, 1, 5, 6];
            expect(arr1.intersect(arr2)).to.deep.equal([1]);


            arr2 = [4, 5, 1];
            expect(arr1.intersect(arr2)).to.deep.equal([1]);
        });

        it('Using the default comparer with objects causes the function to return an empty array', function() {
            var arr1 = [{ value: 1 }, { value: 2 }, { value: 3 }];
            var arr2 = [{ value: 1 }, { value: 2 }, { value: 3 }];

            expect(arr1.intersect(arr2)).to.deep.equal([]);
        });
    });

    describe('Custom comparer tests', function() {
        it('Passing an invalid comparer causes the function to throw an exception', function() {
            var arr1 = [1, 2, 3];
            var arr2 = [4, 5, 6];

            expect(() => arr1.intersect(arr2, null)).to.throw('Expected a function.');
            expect(() => arr1.intersect(arr2, 0)).to.throw('Expected a function.');
            expect(() => arr1.intersect(arr2, 'comparer')).to.throw('Expected a function.');
            expect(() => arr1.intersect(arr2, false)).to.throw('Expected a function.');
            expect(() => arr1.intersect(arr2, {})).to.throw('Expected a function.');
            expect(() => arr1.intersect(arr2, [])).to.throw('Expected a function.');
        });

        it('Get an array of people who have the same name and age', function() {
            var arr1 = [
                {
                    name: 'Clark',
                    age: 20
                },
                {
                    name: 'Bruce',
                    age: 22
                },
                {
                    name: 'Barry',
                    age: 24
                },
                {
                    name: 'Oliver',
                    age: 26
                }
            ];

            var arr2 = [
                {
                    name: 'Barry',
                    age: 24
                },
                {
                    name: 'Clark',
                    age: 21
                },
                {
                    name: 'Bruce',
                    age: 22
                }
            ];

            var comparer = (x, y) => x.name == y.name && x.age == y.age;
            var result = arr1.intersect(arr2, comparer);

            expect(result.length).to.equal(2);
            expect(result[0]).to.deep.equal(arr1[1]);
            expect(result[1]).to.deep.equal(arr1[2]);
        });
    });
});

describe('last tests', function() {
    describe('Calling last with no predicate', function() {
        it('Calling last with an empty array causes the function to throw an exception', function() {
            var arr = [];

            expect(() => arr.last()).to.throw('No elements satisfy the condition or the array is empty.');
        });

        it('Calling last on a one element array returns the only element', function() {
            var arr = [1];
            expect(arr.last()).to.equal(1);

            arr = [true];
            expect(arr.last()).to.equal(true);

            arr = ['last'];
            expect(arr.last()).to.equal('last');

            arr = [{ value: 1 }];
            expect(arr.last()).to.equal(arr[0]);

            arr = [[1, 2, 3]];
            expect(arr.last()).to.equal(arr[0]);
        });

        it('Calling last on an array with many elements returns the last one', function() {
            var arr = [1, 2];
            expect(arr.last()).to.equal(2);

            arr = [1, 2, 3];
            expect(arr.last()).to.equal(3);

            arr = [...Array(10000).keys()];
            expect(arr.last()).to.equal(9999);
        });
    });

    describe('Calling last with predicate', function() {
        it('Calling last with an invalid predicate causes the function to throw an exception', function() {
            var arr = [1, 2, 3];

            expect(() => arr.last(null)).to.throw('Invalid predicate.');
            expect(() => arr.last(0)).to.throw('Invalid predicate.');
            expect(() => arr.last(false)).to.throw('Invalid predicate.');
            expect(() => arr.last(null)).to.throw('Invalid predicate.');
            expect(() => arr.last('predicate')).to.throw('Invalid predicate.');
            expect(() => arr.last([])).to.throw('Invalid predicate.');
            expect(() => arr.last({})).to.throw('Invalid predicate.');
        });

        it('If no elements satisfy the predicate\'s condition, first throws an exception', function() {
            var arr = [1, 2, 3];

            expect(() => arr.last(x => x > 3)).to.throw('No elements satisfy the condition or the array is empty.');
        });

        it('last always returns the last element to satisfy the condition', function() {
            var arr = [
                {
                    name: 'Clark',
                    age: 22
                },
                {
                    name: 'Bruce',
                    age: 23
                },
                {
                    name: 'Clark',
                    age: 24
                }
            ];

            expect(arr.last(x => x.name == 'Clark')).to.equal(arr[2]);
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