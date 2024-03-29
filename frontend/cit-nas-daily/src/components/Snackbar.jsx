import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Snackbar = ({ message, onClose, isSnackbarVisible, isSubmitted }) => {
  const [visible, setVisible] = useState(true);

  const duration = 1500;
  useEffect(() => {
    setVisible(isSnackbarVisible);

    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isSnackbarVisible, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "3%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: isSubmitted ? "#188754" : "#dc3546",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 999,
        display: isSnackbarVisible ? "flex" : "none",
        alignItems: "center",
        height: "auto",
        maxWidth: "40%",
        justifyContent: "left",
      }}
      className="text-xs text-center md:text-center md:text-base lg:text-base lg:text-center"
    >
      {message}
    </div>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  isSnackbarVisible: PropTypes.bool,
  isSubmitted: PropTypes.bool,
};
