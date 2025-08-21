import React, { useState } from "react";

export default function Alert() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type = "info") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000); 
  };

  window.showAlert = showAlert;

  const styles = {
    info: "border border-blue-400 text-blue-400 bg-blue-900/20",
    danger: "border border-red-400 text-red-400 bg-red-900/20",
    success: "border border-green-400 text-green-400 bg-green-900/20",
    warning: "border border-yellow-400 text-yellow-400 bg-yellow-900/20",
    dark: "border border-gray-500 text-gray-300 bg-gray-800",
  };

  return (
    <>
      {alert && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-3 rounded-md shadow-md font-medium ${styles[alert.type]}`}
        >
          {alert.msg}
        </div>
      )}
    </>
  );
}

// window.showAlert("Info alert! Change a few things up and try submitting again.", "info");
// window.showAlert("Danger alert! Change a few things up and try submitting again.", "danger");
// window.showAlert("Success alert! Change a few things up and try submitting again.", "success");
// window.showAlert("Warning alert! Change a few things up and try submitting again.", "warning");
// window.showAlert("Dark alert! Change a few things up and try submitting again.", "dark");
