/**
 * @jsx React.DOM
 */

var React = require("react");
var $ = require("jquery");
var marked = require("marked");

var Comment = React.createClass({
  render: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="alert alert-info" role="alert">
        <h4>
          {this.props.author}
        </h4>

        <p dangerouslySetInnerHTML={{__html: rawMarkup}}/>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function () {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function (data) {
          this.setState({data: data});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>Comments</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CommentList data={this.state.data}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
          </div>
        </div>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your name" ref="author"/>
          </div>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Say something..." ref="text"/>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-default" value="Post"/>
        </div>
      </form>
    );
  }
});

module.exports = CommentBox;
