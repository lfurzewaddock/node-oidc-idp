// eslint-disable-next-line import/no-extraneous-dependencies
import test from "tape";
import xScale from "../../../../src/charts/common/x-scale";
import dataSet from "../../../fixtures/data";

function setup() {
  const fixtures = {
    data: dataSet,
    getLetter: function getLetter(d) {
      return d.letter;
    },
  };

  // Create fresh fixture/objects each time setup() is called.
  return fixtures;
}

// eslint-disable-next-line no-unused-vars
function teardown(fixtures) {
  // Assign reference to null for GC
  fixtures = null; // eslint-disable-line no-param-reassign
}

test("xScale", t => {
  t.test("typeof", assert => {
    const message = "should be a function ";
    const expected = "function";
    const actual = typeof xScale;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("when called with default chartWidth & padding args", assert => {
    const fixtures = setup();
    const { data, getLetter } = fixtures;

    const actual = xScale({
      domainData: data,
      getDomainDataFn: getLetter,
    });

    assert.equals(
      actual("A"),
      10,
      "returns expected start of output band for first input value"
    );
    assert.equals(
      actual("Z"),
      860,
      "returns expected start of output band for last input value"
    );

    teardown(fixtures);
    assert.end();
  });
  t.test("when called with chartWidth = 200 & padding = 1 args", assert => {
    const fixtures = setup();
    const { data, getLetter } = fixtures;

    const actual = xScale({
      chartWidth: 200,
      padding: 1,
      domainData: data,
      getDomainDataFn: getLetter,
    });

    assert.equals(
      actual("A"),
      13,
      "returns expected start of output band for first input value"
    );
    assert.equals(
      actual("Z"),
      188,
      "returns expected start of output band for last input value"
    );

    teardown(fixtures);
    assert.end();
  });
});
