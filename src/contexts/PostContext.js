import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    clickedToUpdatePost: null,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    status: false,
    message: "",
    type: "",
  });

  //   get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);

      if (res.data.success) {
        dispatch({ type: "GET_POSTS_SUCCESS", payload: res.data.posts });
      }
    } catch (error) {
      dispatch({ type: "GET_POSTS_FAILED", payload: null });
    }
  };

  // add post
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);

      if (res.data.success) {
        dispatch({ type: "ADD_POST", payload: res.data.post });
      }

      return res.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Unexpected Error at Add Post" };
    }
  };

  // delete post
  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/posts/${id}`);
      if (res.data.success) {
        dispatch({ type: "DELETE_POST", payload: id });
      }

      return res.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Unexpected Error at Add Post" };
    }
  };

  // Update Post
  const updatePost = async (updateForm) => {
    try {
      const res = await axios.put(
        `${apiUrl}/posts/${updateForm._id}`,
        updateForm
      );
      if (res.data.success) {
        dispatch({ type: "UPDATE_POST", payload: res.data.post });
      }

      return res.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Unexpected error at Update Post" };
    }
  };

  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
