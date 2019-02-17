import React, { Component } from 'react';
import SettingsForm from "./SettingsForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        rows: 10,
        columns: 10
      }
    };
  }

  handleSettingsChange = (field, value) => this.setState({ settings: { ...this.state.settings, [field]: value } });

  render() {
    return (
      <div className="App">
        <SettingsForm rows={this.state.settings.rows} columns={this.state.settings.columns} onChange={this.handleSettingsChange} />
      </div>
    );
  }
}

export default App;
