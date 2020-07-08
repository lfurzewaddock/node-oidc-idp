/* eslint-disable */
import * as d3 from "d3";

function d3WithNoTransition(document) {
  // Required for .transition() in chain after querySelect/selectAll
  d3.selection.prototype.transition = function transition() {
    return this;
  };
  // Source: https://eng.wealthfront.com/2017/10/26/testing-d3-transitions/
  const d3SelectionUnderTestProto = {};
  d3SelectionUnderTestProto.prototype = { ...d3.selection.prototype };
  d3SelectionUnderTestProto.prototype.transition = function transition() {
    return this;
  };
  d3SelectionUnderTestProto.prototype.duration = function duration() {
    return this;
  };
  d3SelectionUnderTestProto.prototype.delay = function delay() {
    return this;
  };
  d3SelectionUnderTestProto.prototype.ease = function ease() {
    return this;
  };
  d3SelectionUnderTestProto.prototype.on = function on(event, callback) {
    if (event === "start" || event === "end") {
      this.each(callback);

      return this;
    }
    return d3SelectionUnderTestProto.on.apply(this, arguments);
  };
  d3SelectionUnderTestProto.prototype.tween = function tween(_name, tweenFn) {
    this.each(function eachTween(datum, index) {
      tweenFn.call(this, datum, index)(1);
    });

    return this;
  };
  d3SelectionUnderTestProto.prototype.attrTween = function attrTween(
    attr,
    tweenFn
  ) {
    this.each(function eachAttrTween(datum, index) {
      select(this).attr(attr, tweenFn.call(this, datum, index)(1));
    });

    return this;
  };
  d3SelectionUnderTestProto.prototype.styleTween = function styleTween(
    style,
    tweenFn
  ) {
    this.each(function eachStyleTween(datum, index) {
      select(this).style(style, tweenFn.call(this, datum, index)(1));
    });

    return this;
  };
  d3SelectionUnderTestProto.prototype.select = selection_select;
  Selection.prototype = { ...d3SelectionUnderTestProto.prototype };

  // Source: d3 v5.15.0
  // File: d3-selection.js
  // Start line 830
  const root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  // File: d3-selection.js
  // End line 835

  // Source: d3 v5.15.0
  // File: d3-selection.js
  // Start line 876
  function select(selector) {
    return typeof selector === "string"
      ? new Selection(
          [[document.querySelector(selector)]],
          [document.documentElement]
        )
      : new Selection([[selector]], root);
  }
  // File: d3-selection.js
  // End line 880

  // Source: d3 v5.15.0
  // File: d3-selection.js
  // Start line 47
  function none() {}

  function selector(selector) {
    return selector == null
      ? none
      : function() {
          return this.querySelector(selector);
        };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (
      var groups = this._groups,
        m = groups.length,
        subgroups = new Array(m),
        j = 0;
      j < m;
      ++j
    ) {
      for (
        var group = groups[j],
          n = group.length,
          subgroup = (subgroups[j] = new Array(n)),
          node,
          subnode,
          i = 0;
        i < n;
        ++i
      ) {
        if (
          (node = group[i]) &&
          (subnode = select.call(node, node.__data__, i, group))
        ) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }
  // File: d3-selection.js
  // End line 68

  const selectProxy = new Proxy(select, {
    apply(target, thisValue, args) {
      return Reflect.apply(target, thisValue, args);
    },
  });

  const d3Proxy = new Proxy(d3, {
    get(target, prop, receiver) {
      if (prop === "select") {
        return selectProxy;
      }
      return Reflect.get(target, prop, receiver);
    },
  });

  return d3Proxy;
}

export default d3WithNoTransition;
