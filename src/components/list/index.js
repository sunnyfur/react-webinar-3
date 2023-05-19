import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {props.list
        .sort((a, b) => a.code - b.code)
        .map((item) => (
          <div key={item.code} className="List-item">
            <Item
              item={item}
              onAction={props.onActionItem}
              actionTitle={props.actionTitle}
            />
          </div>
        ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onActionItem: PropTypes.func,
};

List.defaultProps = {
  onActionItem: () => {},
  actionTitle: "",
};

export default React.memo(List);
