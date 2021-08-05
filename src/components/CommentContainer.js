import Comment from "./Comment";

function CommentContainer({ comments }) {

    return (
        <>
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        author={comment.author}
                        content={comment.content}
                    />
                )
            })}
        </>
    );
}

export default CommentContainer;