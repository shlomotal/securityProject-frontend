import React from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "50px",
  backgroundColor: "#FFF",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

export default function Modal({ text, open, onclose, color }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {text}
        <p></p>
        <Button size="sm" block onClick={onclose}>
          {" "}
          Close{" "}
        </Button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
