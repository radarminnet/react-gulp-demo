/**
 * @jsx React.DOM
 */

var React = require("react");

var CountBox = React.createClass({
  getInitialState: function() {
    return {count: 0};
  },
  incrementCount: function () {
    this.setState({count: this.state.count + 1});
  },
  render: function () {
    return (
      <div>
        <button className="btn" onClick={this.incrementCount}>
          Click me!
        </button>
        <CountLabel count={this.state.count}/>
      </div>
    );
  }
});

var CountLabel = React.createClass({
  render: function () {
    return (
      <div>{this.props.count}</div>
    );
  }
});

module.exports = CountBox;
