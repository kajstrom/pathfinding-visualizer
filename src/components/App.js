import React, { Component } from 'react';
import cloneDeep from 'clone-deep';
import SettingsForm from "./SettingsForm";
import Map from "./Map";
import createMap from "../domain/map/create";
import toggleTileType from "../domain/map/toggleTileType";
import dijkstra from "../domain/algorithms/dijkstra";
import aStar from "../domain/algorithms/astar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        rows: 10,
        columns: 10,
        algorithm: "dijkstra"
      },
      map: createMap(10, 10),
      start: null,
      goal: null,
      pathLength: null,
      visitedTiles: null,
      executionTime: null
    };
  }

  handleSettingsChange = (field, value) => {
    const dimensionsChanged = field === "rows" || field === "columns";

    let afterStateFn;
    if (dimensionsChanged) {
      afterStateFn = () => {
        this.setState({ map: createMap(this.state.settings.rows, this.state.settings.columns) })
      };
    } else {
      afterStateFn = this.handleStatusReset;
    }

    this.setState({ settings: { ...this.state.settings, [field]: value } }, afterStateFn);
  };

  handleStartChange = (start) => this.setState({ start });

  handleGoalChange = (goal) => this.setState({ goal });

  handlePassableToggle = (tile) => {
    this.setState({ map: toggleTileType(this.state.map, tile.x, tile.y) });
  }

  handleReset = () => this.setState(state => {
    return { map: createMap(state.settings.rows, state.settings.columns) }
  });

  handleStatusReset = () => {
    const map = this.state.map;

    this.setState({ map: map.map(tileRow => tileRow.map(tile => { return { ...tile, visited: false, onShortestPath: false }; })) });
  }

  handleRun = () => {
    const { map, start, goal } = this.state;

    let path;

    const startTime = new Date();
    const algorithm = this.state.settings.algorithm;
    if (algorithm === "dijkstra") {
      path = dijkstra(cloneDeep(map), start, goal);
    } else if (algorithm === "a*") {
      path = aStar(cloneDeep(map), start, goal);
    } else {
      throw new Error(`No such algorithm: ${algorithm}`);
    }
    const endTime = new Date();

    const { shortestPath, visited } = path;

    this.setState(state => {
      const map = cloneDeep(state.map);
      let pathLength = 0;

      if (shortestPath) {
        shortestPath.forEach(({x, y}) => {
          map[y][x].onShortestPath = true;
        });
        pathLength = shortestPath.length;
      }

      visited.forEach(({x, y}) => {
        map[y][x].visited = true;
      })

      return { map, pathLength, visitedTiles: visited.length, executionTime: endTime - startTime };
    });
  }

  render() {
    return (
      <div className="App">
        <SettingsForm
          rows={this.state.settings.rows}
          columns={this.state.settings.columns}
          onChange={this.handleSettingsChange}
          onRun={this.handleRun}
          onReset={this.handleReset}
          onStatusReset={this.handleStatusReset}
        />
        <div>
          Path length: {this.state.pathLength} <br />
          Visited tiles: {this.state.visitedTiles} <br />
          Time: {this.state.executionTime} ms<br />
        </div>
        <Map
          start={this.state.start}
          goal={this.state.goal}
          map={this.state.map}
          onTilePassableToggle={this.handlePassableToggle}
          onStartChange={this.handleStartChange}
          onGoalChange={this.handleGoalChange}
          />
      </div>
    );
  }
}

export default App;
