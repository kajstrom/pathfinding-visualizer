import React from "react";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this.div = React.createRef();
  }

  onMouseEnter = () => {
    this.setState({ hovered: true });
    this.div.current.focus();
  }

  onMouseLeave = () => {
    this.setState({ hovered: false });
  }

  onKeyPress = (e) => {
    const key = e.key;
    const {x, y} = this.props.tile;
    
    if ("s" === key) {
      this.props.onStartChange({ x, y });
    } else if ("g" === key) {
      this.props.onGoalChange({ x, y });
    }
  }

  onClick = () => {
    this.props.onPassableToggle(this.props.tile);
  
    if (this.isStart()) {
      this.props.onStartChange(null);
    }

    if (this.isGoal()) {
      this.props.onGoalChange(null);
    }
  }

  getStyle = (tile) => {
    const style = { width: "20px", height: "20px", border: "1px solid black", display: "inline-block" };
  
    if (tile.type === "impassable") {
      style.backgroundColor = "black";
    }
  
    return style;
  }

  isStart() {
    const { tile, start } = this.props;

    return start && start.x === tile.x && start.y === tile.y;
  }

  isGoal() {
    const { tile, goal } = this.props;

    return goal && goal.x === tile.x && goal.y === tile.y
  }

  contentForTile (tile) {
    if (this.isStart()) {
      return "S";
    }
  
    if (this.isGoal()) {
      return "G";
    }
  
    if (tile.type === "passable" || tile.type === "impassable") {
      return <React.Fragment>&nbsp;</React.Fragment>
    }
  };

  render() {
    const { tile } = this.props;

    return <div
      ref={this.div}
      tabIndex={this.state.hovered ? 0 : 9999}
      onClick={this.onClick}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      onKeyPress={this.onKeyPress}
      style={this.getStyle(tile)}
      >
      {this.contentForTile(tile)}
    </div>;
  }
};

export default Tile;