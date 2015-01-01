var CommentBox = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return{data: []};
  },
  componentDidMount: function(){
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className="commentBox"> 
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function(comment){
      return(
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return(
      <div className="commentList">
        <span> {commentNodes} </span>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function(){
    return(
      <div className="comment">
        <h2 className="commentAuthor"> {this.props.author} </h2>
        <span> {this.props.children} </span>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function(){
    return(
      <div className="commentForm"> This is a commentForm div </div>
    );
  }
});

React.render(
  <CommentBox url="src/comments.json" pollInterval={500}/>, 
  document.getElementById('content')
 );




















































