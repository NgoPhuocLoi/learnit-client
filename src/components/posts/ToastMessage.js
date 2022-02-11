import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

function ToastMessage() {
  const {
    showToast: { status, type, message },
    setShowToast,
  } = useContext(PostContext);
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg={type}
        className="text-white"
        show={status}
        delay={3000}
        autohide
        onClose={() => setShowToast({ status: false, type: "", message: "" })}
      >
        <Toast.Header>
          <strong className="me-auto">LearnIt</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
