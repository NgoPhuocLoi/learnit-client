import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

function UpdatePostModal() {
  const {
    showUpdatePostModal,
    setShowUpdatePostModal,
    postState: { clickedToUpdatePost },
    setShowToast,
    updatePost,
  } = useContext(PostContext);
  const [updatedPost, setUpdatedPost] = useState(clickedToUpdatePost);

  useEffect(() => {
    setUpdatedPost(clickedToUpdatePost);
  }, [clickedToUpdatePost]);

  const { title, description, url } = updatedPost;

  const onChangeUpdatedPostForm = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const { success } = await updatePost(
        updatedPost,
        clickedToUpdatePost._id
      );
      if (success) {
        setShowToast({
          status: true,
          message: "Updated successfully!!!",
          type: "success",
        });
        closeModal();
      } else {
        setShowToast({
          status: true,
          message: "Updated failed!!!",
          type: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowUpdatePostModal(false);
    setUpdatedPost(clickedToUpdatePost);
  };
  return (
    <Modal show={showUpdatePostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              value={title}
              onChange={onChangeUpdatedPostForm}
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Control
              as={"textarea"}
              placeholder="Description"
              name="description"
              rows={3}
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tutorial Url"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              onChange={onChangeUpdatedPostForm}
              className="mt-3"
              value={updatedPost.status}
              name="status"
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="FINISH">LEARNED</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmitUpdatePost}
          >
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;
