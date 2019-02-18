import React, { Component } from 'react';
import SettingsForm from "./SettingsForm";
import Map from "./Map";
import createMap from "../domain/map/create";
import toggleTileType from "../domain/map/toggleTileType";
import runDijkstra from "../domain/algorithms/dijkstra";

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

  handleRun = () => {
    const { map, start, goal } = this.state;

    runDijkstra(map, start, goal);
  }

  render() {
    return (
      <div className="App">
        <SettingsForm
          rows={this.state.settings.rows}
          columns={this.state.settings.columns}
          onChange={this.handleSettingsChange}
          onRun={this.handleRun}
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
