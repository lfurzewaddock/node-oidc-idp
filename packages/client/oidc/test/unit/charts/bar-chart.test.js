// eslint-disable-next-line import/no-extraneous-dependencies
import test from "tape";
import d3WithoutTransition from "../../d3-without-transition";
import isNodeEnvironment from "../../utils";
import barChartHof from "../../../src/charts/bar-chart";
import dataset from "../../fixtures/data";

function setup() {
  const isNode = isNodeEnvironment();
  var globalObj = {};
  if (isNode) {
    if (
      typeof global.jsTddKitLfurzewaddockComGithub !== "object" ||
      typeof global.jsTddKitLfurzewaddockComGithub.jsdom !== "object"
    ) {
      throw new Error(
        "jsTddKitLfurzewaddockComGithub namespace or jsdom on namespace does not exist!"
      );
    }
    const { JSDOM } = global.jsTddKitLfurzewaddockComGithub.jsdom;
    globalObj = new JSDOM().window;
  } else {
    globalObj = window;
  }
  const el = globalObj.document.createElement("div");
  el.setAttribute("id", "fixture1");
  globalObj.document.body.appendChild(el);

  const d3 = d3WithoutTransition(globalObj.document);

  const fixtures = {
    isNode,
    window: globalObj,
    document: globalObj.document,
    divElement: el,
    d3,
    data: dataset,
  };

  // Create fresh fixture/objects each time setup() is called.
  return fixtures;
}

function teardown(fixtures) {
  // Dispose fixtures
  fixtures.document.body.innerHTML = "";
  // Assign reference to null for GC
  fixtures = null; // eslint-disable-line no-param-reassign
}

test("barChart", t => {
  t.test("typeof", assert => {
    const message = "should be a function ";
    const expected = "function";
    const actual = typeof barChartHof;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("when called with d3 select on existing svg", assert => {
    const fixtures = setup();
    const svg = fixtures.document.createElement("svg");
    fixtures.divElement.appendChild(svg);

    const { d3 } = fixtures;
    const { select } = d3;

    const container = select(svg);
    const barChart = barChartHof({ select });
    container.datum([]).call(barChart());

    const actual = container.node();

    assert.equals(actual.tagName.toLowerCase(), "svg", "uses existing svg");
    assert.equals(
      actual.getAttribute("class"),
      "bar-chart",
      "with expected class name"
    );
    assert.equals(
      parseInt(actual.getAttribute("width"), 10),
      960,
      "with expected width"
    );
    assert.equals(
      parseInt(actual.getAttribute("height"), 10),
      500,
      "with expected height"
    );

    teardown(fixtures);
    assert.end();
  });
  t.test("when called with d3 select on existing container", assert => {
    const fixtures = setup();
    const div = fixtures.divElement;

    const { d3 } = fixtures;
    const { select } = d3;

    const container = select(div);
    const barChart = barChartHof({ select });
    container.datum([]).call(barChart());

    const actual = container.node();
    const { children } = actual;
    const lastChild = children[children.length - 1];

    assert.equals(
      lastChild.tagName.toLowerCase(),
      "svg",
      "appends new svg to container"
    );
    assert.equals(
      lastChild.getAttribute("class"),
      "bar-chart",
      "with expected class"
    );
    assert.equals(
      parseInt(lastChild.getAttribute("width"), 10),
      960,
      "with expected width"
    );
    assert.equals(
      parseInt(lastChild.getAttribute("height"), 10),
      500,
      "with expected height"
    );

    teardown(fixtures);
    assert.end();
  });
  t.test("when buildContainerGroups is called", assert => {
    const fixtures = setup();
    const div = fixtures.divElement;

    const { d3 } = fixtures;
    const { select } = d3;

    const container = select(div);
    const barChart = barChartHof({ select });
    container.datum([]).call(barChart());

    const containerGroup = fixtures.document.getElementsByClassName(
      "container-group"
    );
    const chartGroup = containerGroup
      .item(0)
      .getElementsByClassName("chart-group");
    const xAxisGroup = containerGroup
      .item(0)
      .getElementsByClassName("x-axis-group");
    const yAxisGroup = containerGroup
      .item(0)
      .getElementsByClassName("y-axis-group");

    assert.equals(
      containerGroup.length,
      1,
      "One container-group element is present"
    );
    assert.equals(
      containerGroup.item(0).nodeName,
      "g",
      "with expected nodeName"
    );
    assert.equals(
      containerGroup.item(0).getAttribute("transform"),
      "translate(40,20)",
      "with expected transform"
    );
    assert.equals(chartGroup.length, 1, "One chart-group element is present");
    assert.equals(chartGroup.item(0).nodeName, "g", "with expected nodeName");
    assert.equals(xAxisGroup.length, 1, "One x-axis-group element is present");
    assert.equals(xAxisGroup.item(0).nodeName, "g", "with expected nodeName");
    assert.equals(yAxisGroup.length, 1, "One y-axis-group element is present");
    assert.equals(yAxisGroup.item(0).nodeName, "g", "with expected nodeName");

    teardown(fixtures);
    assert.end();
  });
  t.test("when drawAxis is called", assert => {
    const fixtures = setup();
    const div = fixtures.divElement;

    const { d3, data } = fixtures;
    const { select } = d3;

    const container = select(div);
    const barChart = barChartHof({ select });
    container.datum(data).call(barChart());

    const xAxisGroup = fixtures.document.getElementsByClassName("x-axis-group");
    const xAxisPath = xAxisGroup.item(0).getElementsByClassName("domain");
    const xAxisTicks = xAxisGroup.item(0).getElementsByClassName("tick");
    const yAxisGroup = fixtures.document.getElementsByClassName("y-axis-group");
    const yAxisPath = xAxisGroup.item(0).getElementsByClassName("domain");
    const yAxisTicks = yAxisGroup.item(0).getElementsByClassName("tick");

    assert.equals(
      xAxisPath.length,
      1,
      "one path present within the x-axis-group"
    );
    assert.equals(xAxisPath.item(0).nodeName, "path", "with expected nodeName");
    assert.equals(
      xAxisTicks.length,
      26,
      "expected quantity of ticks are present within the x-axis-group"
    );
    assert.equals(
      Array.from(xAxisTicks).filter(tick => tick.nodeName === "g").length,
      26,
      "with expected nodeName"
    );
    assert.equals(
      yAxisPath.length,
      1,
      "one path present within the y-axis-group"
    );
    assert.equals(yAxisPath.item(0).nodeName, "path", "with expected nodeName");
    assert.equals(
      yAxisTicks.length,
      13,
      "expected quantity of ticks are present within the y-axis-group"
    );
    assert.equals(
      Array.from(yAxisTicks).filter(tick => tick.nodeName === "g").length,
      13,
      "with expected nodeName"
    );

    teardown(fixtures);
    assert.end();
  });

  t.test("when drawBars is called", assert => {
    const fixtures = setup();
    const div = fixtures.divElement;

    const { d3, data } = fixtures;
    const { select } = d3;

    const container = select(div);
    const barChart = barChartHof({ select });
    container.datum(data).call(barChart());

    const chartGroup = fixtures.document.getElementsByClassName("chart-group");
    const bars = chartGroup.item(0).getElementsByClassName("bar");

    assert.equals(bars.length, 26, "26 bars present within the chart group");
    assert.equals(
      Array.from(bars).filter(bar => bar.nodeName === "rect").length,
      26,
      "with expected nodeName"
    );
    assert.equals(
      Array.from(bars).filter(
        bar => parseInt(bar.getAttribute("width"), 10) === 31
      ).length,
      26,
      "with expected width"
    );
    assert.equals(
      parseInt(bars.item(0).getAttribute("x"), 10),
      10,
      "First bar has expected X position"
    );
    assert.equals(
      parseInt(bars.item(bars.length - 1).getAttribute("x"), 10),
      860,
      "Last bar has expected X position"
    );
    assert.equals(
      parseInt(bars.item(0).getAttribute("y"), 10),
      161,
      "First bar has expected Y position"
    );
    assert.equals(
      parseInt(bars.item(bars.length - 1).getAttribute("y"), 10),
      447,
      "Last bar has expected Y position"
    );
    assert.equals(
      parseInt(bars.item(0).getAttribute("height"), 10),
      289,
      "First bar has expected height"
    );
    assert.equals(
      parseInt(bars.item(bars.length - 1).getAttribute("height"), 10),
      3,
      "Last bar has expected height"
    );

    teardown(fixtures);
    assert.end();
  });
});
