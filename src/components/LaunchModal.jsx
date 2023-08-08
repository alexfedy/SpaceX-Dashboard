import React, { useState, useEffect } from "react";

const Modal = (props) => {
  const [show, setShow] = useState(false);
  const launch = props.items[0];

  useEffect(() => {
    setShow(props.items[1]);
  }, [props]);

  return (
    <>
      {show && (
        <div className="bg-default rounded-lg p-24">
          <p>Modal open</p>
          <button onClick={(prev) => setShow(!prev)}>X</button>
        </div>
      )}
    </>
  );
};

export default Modal;
