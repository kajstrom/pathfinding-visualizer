import React, { Component } from 'react';
import cloneDeep from 'clone-deep';
import SettingsForm from "./SettingsForm";
import Map from "./Map";
import createMap from "../domain/map/create";
import toggleTileType from "../domain/map/toggleTileType";
import dijkstra from "../domain/algorithms/dijkstra";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        rows: 10,
        columns: 10
      },
      map: createMap(10, 10),
      start: null,
      goal: null
    };
  }

  handleSettingsChange = (field, value) => this.setState({ settings: { ...this.state.settings, [field]: value } }, () => {
    this.setState({ map: createMap(this.state.settings.rows, this.state.settings.columns) })
  });

  handleStartChange = (start) => this.setState({ start });

  handleGoalChange = (goal) => this.setState({ goal });

  handlePassableToggle = (tile) => {
    this.setState({ map: toggleTileType(this.state.map, tile.x, tile.y) });
  }

  handleReset = () => this.setState(state => {
    return { map: createMap(state.settings.rows, state.settings.columns) }
  });

  handleRun = () => {
    const { map, start, goal } = this.state;

    const {shortestPath, visited} = dijkstra(cloneDeep(map), start, goal);

    if (shortestPath) {
      this.setState(state => {
        const map = cloneDeep(state.map);

        shortestPath.forEach(({x, y}) => {
          map[y][x].onShortestPath = true;
        });

        visited.forEach(({x, y}) => {
          map[y][x].visited = true;
        })

        return { map };
      });
    }
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
        />
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
