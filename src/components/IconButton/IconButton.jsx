import { PropTypes } from "prop-types";

import s from "./IconButton.module.scss";

function IconButton({ children, onClick, type = "button", label }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={label}
      className={s.button}
    >
      {children}
    </button>
  );
}
IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
};
export default IconButton;
