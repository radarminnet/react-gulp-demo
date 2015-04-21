var React = require("react");
var CommentBox = require("./app.jsx");

React.render(
    <CommentBox url="comments.json" pollInterval={2000}/>,
    document.getElementById('main')
);