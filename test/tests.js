var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('all tests', function() {
    it('Missing, null, or undefined predicate raises an exception', function() {
        var arr = l([1, 2, 3]);

        expect(() => arr.all()).to.throw('Invalid predicate.');
        expect(() => arr.all(null)).to.throw('Invalid predicate.');
        expect(() => arr.all(undefined)).to.throw('Invalid predicate.');
    });

    it('Search for true in an array of true values returns true', function() {
        var arr = l([true, true, true]);
        var result = arr.all(x => x === true);

        expect(result).to.equal(true);
    });

    it('Search for true in an array of mixed boolean values returns false', function() {
        var arr = l([false, true, false]);
        var result = arr.all(x => x === true);

        expect(result).to.equal(false);
    });

    it('Search for true in an array of false values returns false', function() {
        var arr = l([false, false, false]);
        var result = arr.all(x => x === true);

        expect(result).to.equal(false);
    });

    it('Determine if all numbers are even in an array filled with even numbers returns true', function() {
        var arr = l([2, 4, 6, 8]);
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(true);
    });

    it('Determine if all numbers are even in an array with both odd and even numbers returns false', function() {
        var arr = l([1, 2, 3, 4, 5, 6]);
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(false);
    });

    it('Determine if all numbers are even in an array filled with odd numbers returns false', function() {
        var arr = l([1, 3, 5, 7, 9]);
        var result = arr.all(x => x % 2 == 0);

        expect(result).to.equal(false);
    });

    it('Determine if all people in an object array are teenagers', function() {
        var arr = l([
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
        ]);

        var result = arr.all(x => x.age >= 13 && x.age <= 19);

        expect(result).to.equal(true);
    });
});

describe('any tests', function() {
    describe('Parameterless overload', function() {
        it('Applying any on empty array returns false', function() {
            var arr = l(new Array());
            expect(arr.any()).to.equal(false);
        });

        it('Applying any on a non empty array returns true', function() {
            var arr = l([1, 2, 3]);
            expect(arr.any()).to.equal(true);
        });

        it('Applying any on an array with only one element returns true', function() {
            var arr = l([0]);
            expect(arr.any()).to.equal(true);
        });

        it('Applying any on an array with empty objects returns true', function() {
            var arr = l([{}, {}]);
            expect(arr.any()).to.equal(true);
        });
    });

    describe('Predicate overload', function() {
        it('Applying any to search for even numbers in an array filled with even numbers returns true', function() {
            var arr = l([2, 4, 6, 8, 10]);
            expect(arr.any(x => x % 2 == 0)).to.equal(true);
        });

        it('Applying any to search for even numbers in an array with al least one even number returns true', function() {
            var arr = l([1, 2, 3, 4, 5]);
            expect(arr.any(x => x % 2 == 0)).to.equal(true);
        });

        it('Applying any to search for even numbers in an array filled with odd numbers returns false', function() {
            var arr = l([1, 3, 5, 7, 9]);
            expect(arr.any(x => x % 2 == 0)).to.equal(false);
        });

        it('Search people by name', function() {
            var arr = l([
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne'
                },
                {
                    firstName: 'Clark',
                    lastName: 'Kent'
                }
            ]);

            expect(arr.any(x => x.firstName == 'Clark')).to.equal(true);
            expect(arr.any(x => x.firstName == 'Oliver')).to.equal(false);
        });
    });
});

describe('select tests', function() {
    it('Missing, null, or undefined selector raises an exception', function() {
        var arr = l([1, 2, 3]);

        expect(() => arr.select()).to.throw('Invalid selector.');
        expect(() => arr.select(null)).to.throw('Invalid selector.');
        expect(() => arr.select(undefined)).to.throw('Invalid selector.');
    });

    it('Return same elements in selector produces a clone of the original array', function() {
        var arr = l([1, 2, 3]);
        var result = arr.select(x => x).toArray();

        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('Return index in selector', function() {
        var arr = l([1, 2, 3]);
        var result = arr.select((x, i) => i).toArray();

        expect(result).to.deep.equal(['0', '1', '2']);
    });

    it('Apply an operation inside the selector', function() {
        var arr = l([1, 2, 3]);
        var result = arr.select(x => x * 2).toArray();

        expect(result).to.deep.equal([2, 4, 6]);
    });

    it('Calculate the lengths of strings', function() {
        var arr = l(['Linq', 'Testing', 'select', 'string']);
        var result = arr.select(x => x.length).toArray();

        expect(result).to.deep.equal([4, 7, 6, 6]);
    });

    it('Getting data from objects', function() {
        var arr = l([
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
        ]);

        var result = arr.select(x => x.firstName + ' ' + x.lastName).toArray();

        expect(result).to.deep.equal(['Bruce Wayne', 'Clark Kent']);
    });

    it('Chained select calls', function() {
        var arr = l([1, 2, 3]);
        var result = arr.select(x => x * 2).select(x => x + 1).toArray();

        expect(result).to.deep.equal([3, 5, 7]);
    });

    it('Chaining select calls equals to applying all operations in the same selector', function() {
        var arr = l([1, 2, 3]);
        var resultA = arr.select(x => x * 2).select(x => x + 1).toArray();
        var resultB = arr.select(x => (x * 2) + 1).toArray()

        expect(resultA).to.deep.equal(resultB);
    });
});

describe('Integration tests', function () {

});