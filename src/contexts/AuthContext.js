import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const navigate = useNavigate();

  //   Authenticate User
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: res.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);

      /*  res.data = {
                success: true || false
                message: ...
                accessToken: ...
            } */

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        await loadUser();
        return res.data;
      }
    } catch (error) {
      // Error from server
      if (error.response.data) return error.response.data;
      // Error unexpected
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (registerForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, registerForm);

      if (res.data.success) {
        navigate("/login");
        return res.data;
      }
    } catch (error) {
      // Error from server
      if (error.response.data) return error.response.data;
      // Error unexpected
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context Data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  //   Return provider
  return (
    <authContext.Provider value={authContextData}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
