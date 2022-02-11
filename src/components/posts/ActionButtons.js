import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext";

function ActionButtons({ url, id }) {
  const { deletePost, setShowUpdatePostModal, postState } =
    useContext(PostContext);
  const handleDeletePost = async () => {
    try {
      await deletePost(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenUpdatePost = () => {
    const clickedPost = postState.posts.find((post) => post._id === id);
    console.log("clickedPost", clickedPost);
    postState.clickedToUpdatePost = clickedPost;
    setShowUpdatePostModal(true);
  };
  return (
    <>
      <Button
        className="post-button"
        href={url}
        target="_blank"
        variant="outline-light"
      >
        <img src={playIcon} alt="play-icon" width="32" height="32" />
      </Button>
      <Button
        className="post-button"
        variant="outline-light"
        onClick={handleOpenUpdatePost}
      >
        <img src={editIcon} alt="edit-icon" width="24" height="24" />
      </Button>
      <Button
        className="post-button"
        variant="outline-light"
        onClick={handleDeletePost}
      >
        <img src={deleteIcon} alt="delete-icon" width="24" height="24" />
      </Button>
    </>
  );
}

export default ActionButtons;
