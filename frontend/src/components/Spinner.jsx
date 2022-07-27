
import React from 'react';
import Loading from "../assets/spinner.gif";

function Spinner() {
  return (
    <div className="text-center w-100">
        <img src={Loading} width={180} alt="loading" className="inline-block text-center"/>
    </div>
  )
};

export default Spinner