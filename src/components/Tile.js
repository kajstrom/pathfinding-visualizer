import React from "react";

const contentFromType = (tile) => {
  if (tile.type === "passable" || tile.type === "impassable") {
    return <React.Fragment>&nbsp;</React.Fragment>
  }

  if (tile.type === "start") {
    return "S";
  }

  if (tile.type === "goal") {
    return "G";
  }
};

const getStyle = (tile) => {
  const style = { width: "20px", height: "20px", border: "1px solid black", display: "inline-block" };

  if (tile.type === "impassable") {
    style.backgroundColor = "black";
  }

  return style;
}

const Tile = (props) => {
  const { tile } = props;

  return <div onClick={() => props.onPassableToggle(tile)} style={getStyle(tile)}>
    {contentFromType(tile)}
  </div>
};

export default Tile;