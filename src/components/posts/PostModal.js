import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

function PostModal() {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();

    const { success, message } = await addPost(newPost);
    if (success) {
      setShowToast({ status: true, message: message, type: "info" });
    } else {
      setShowToast({ status: true, message: message, type: "danger" });
    }
    closeModal();
  };

  const closeModal = () => {
    setShowAddPostModal(false);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };
  return (
    <Modal show={showAddPostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              onChange={onChangeNewPostForm}
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
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tutorial Url"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmitNewPost}>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PostModal;
