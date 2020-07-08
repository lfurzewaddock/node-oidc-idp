// eslint-disable-next-line import/no-extraneous-dependencies
import test from "tape";
import yScale from "../../../../src/charts/common/y-scale";
import dataSet from "../../../fixtures/data";

function setup() {
  const fixtures = {
    data: dataSet,
    getFrequency: function getFrequency(d) {
      return d.frequency;
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

test("yScale", t => {
  t.test("typeof", assert => {
    const message = "should be a function ";
    const expected = "function";
    const actual = typeof yScale;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("when called with default chartHeight args", assert => {
    const fixtures = setup();
    const { data, getFrequency } = fixtures;

    const actual = yScale({
      domainData: data,
      getDomainDataFn: getFrequency,
    });

    assert.equals(
      actual(0.00074),
      447,
      "returns expected output scale position for smallest input value"
    );
    assert.equals(
      actual(0.12702),
      0,
      "returns expected output scale position for largest input value"
    );

    teardown(fixtures);
    assert.end();
  });
  t.test("when called with chartHeight = 200 args", assert => {
    const fixtures = setup();
    const { data, getFrequency } = fixtures;

    const actual = yScale({
      chartHeight: 200,
      domainData: data,
      getDomainDataFn: getFrequency,
    });

    assert.equals(
      actual(0.00074),
      199,
      "returns expected output scale position for smallest input value"
    );
    assert.equals(
      actual(0.12702),
      0,
      "returns expected output scale position for largest input value"
    );

    teardown(fixtures);
    assert.end();
  });
});
