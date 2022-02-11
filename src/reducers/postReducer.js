export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case "GET_POSTS_FAILED":
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, payload],
        postLoading: false,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    default:
      return state;
  }
};
