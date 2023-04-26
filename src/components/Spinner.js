import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Loading Gif" />
    </div>
  );
};

export default Spinner;
