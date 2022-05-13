import React from 'react';

const StagedPalette = ({ palette }) => {
  return (
    <div>
      <p>Staged Palette</p>
      <ul style={{display: 'flex', flexDirection: 'row', gap: '15px', padding: '15px', flexWrap: 'wrap', boxShadow: '5px 5px 10px dimgrey', listStyle: 'none', minHeight: '120px'}}>
        {palette.map((colour, index) => {
          return (
            <li key={index} style={{flex: 1}}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: colour
              }}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default StagedPalette;