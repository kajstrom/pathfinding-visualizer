import React from 'react';

const SettingsForm = (props) => {
  const onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    props.onChange(field, value);
  }

  return <div>
    <input type="number" value={props.rows} name="rows" onChange={onChange} />
    <input type="number" value={props.columns} name="columns" onChange={onChange} />
    <select name="algorithm" value={props.algorithm} onChange={onChange}>
      <option value="dijkstra">Dijkstra</option>
      <option value="a*">A*</option>
    </select>
    <button onClick={props.onRun}>Run!</button>
    <button onClick={props.onReset}>Reset!</button>
    <button onClick={props.onStatusReset}>Reset status!</button>
  </div>
}

export default SettingsForm;
