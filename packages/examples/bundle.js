(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global = global || self, factory(global.React, global.ReactDOM));
}(this, (function (React, ReactDOM) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const Examples = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "carousel-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"), /*#__PURE__*/React.createElement("div", {
      className: "slide"
    }, "Content"));
  };

  ReactDOM.render( /*#__PURE__*/React.createElement(Examples, null), document.getElementById('root'));

})));
//# sourceMappingURL=bundle.js.map
