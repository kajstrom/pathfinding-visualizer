import React, { Component } from 'react';
import SettingsForm from "./SettingsForm";
import Map from "./Map";
import createMap from "../domain/map/create";
import toggleTileType from "../domain/map/toggleTileType";

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

  handleSettingsChange = (field, value) => this.setState({ settings: { ...this.state.settings, [field]: value } });

  handleStartChange = (start) => this.setState({ start });

  handleGoalChange = (goal) => this.setState({ goal });

  handlePassableToggle = (tile) => {
    this.setState({ map: toggleTileType(this.state.map, tile.x, tile.y) });
  }

  render() {
    return (
      <div className="App">
        <SettingsForm
          rows={this.state.settings.rows}
          columns={this.state.settings.columns}
          onChange={this.handleSettingsChange}
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
