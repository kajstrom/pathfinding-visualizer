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
  </div>
}

export default SettingsForm;
