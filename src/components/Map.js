import React from "react";
import Tile from "./Tile";

const Map = (props) => {
  return <div>
    {props.map.map(rowTiles => {
      return <div style={{height: "21px"}}>
        {rowTiles.map(tile => <Tile
          onPassableToggle={props.onTilePassableToggle}
          tile={tile}
          start={props.start} goal={props.goal}
          onStartChange={props.onStartChange}
          onGoalChange={props.onGoalChange}
        />)}
      </div>
    })}
  </div>;
}

export default Map;
