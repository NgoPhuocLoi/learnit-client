import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import addIcon from "../assets/plus-circle-fill.svg";
import PostModal from "../components/posts/PostModal";
import SinglePost from "../components/posts/SinglePost";
import ToastMessage from "../components/posts/ToastMessage";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { authContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";

function DashBoard() {
  const {
    postState: { posts, postLoading, clickedToUpdatePost },
    getPosts,
    setShowAddPostModal,
  } = useContext(PostContext);
  const {
    authState: {
      user: { username },
    },
  } = useContext(authContext);

  // start get all posts
  useEffect(() => {
    getPosts();
    console.log("posts", posts);
  }, []);

  let body;

  if (postLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Card className="text-center">
        <Card.Header as={"h1"}>Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn.
          </Card.Text>
          <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
            Learn Now!!
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <Row xs={1} md={3} className="g-4 mt-2 px-2">
          {posts.map((post) => (
            <Col key={post._id}>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new post to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
            variant="outline-light"
          >
            <img src={addIcon} alt="add-icon" width="50" height="50" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <div>
      {body}
      <PostModal />
      <ToastMessage />
      {clickedToUpdatePost !== null && <UpdatePostModal />}
    </div>
  );
}

export default DashBoard;
