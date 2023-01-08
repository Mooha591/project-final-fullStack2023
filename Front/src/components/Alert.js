import { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, todos }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [todos, removeAlert]); // if we don't add todos, the alert will not be removed

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
