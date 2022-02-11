export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/v1"
    : "https://leanrit-server.herokuapp.com/v1";
//http://localhost:5000/v1
export const LOCAL_STORAGE_TOKEN_NAME = "learnIt";
