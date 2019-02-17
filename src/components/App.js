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
      map: createMap(10, 10)
    };
  }

  handleSettingsChange = (field, value) => this.setState({ settings: { ...this.state.settings, [field]: value } });

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
        <Map map={this.state.map} onTilePassableToggle={this.handlePassableToggle} />
      </div>
    );
  }
}

export default App;
