var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('all tests', function() {

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
                firstName: 'John',
                lastName: 'Smith',
                age: 32
            },
            {
                firstName: 'George',
                lastName: 'Mason',
                age: 51
            }
        ]);

        var result = arr.select(x => x.firstName + ' ' + x.lastName).toArray();

        expect(result).to.deep.equal(['John Smith', 'George Mason']);
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