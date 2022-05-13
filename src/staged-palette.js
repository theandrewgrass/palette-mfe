import React from 'react';
import styled from 'styled-components';

const S = {};

S.ListItem = styled.li`
  height: 120px;
  width: 120px;
`;

S.ColourBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.colour};
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.ColourSelect = styled.button`
  background-color: white;
  font-size: 24px;
  line-height: 24px;
  color: black;
  border: none;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
`;

const StagedPalette = ({ palette, onColourClicked }) => {
  return (
    <div>
      <p>Staged Palette</p>
      <ul style={{display: 'flex', flexDirection: 'row', gap: '15px', padding: '15px', flexWrap: 'wrap', boxShadow: '5px 5px 10px dimgrey', listStyle: 'none', minHeight: '120px'}}>
        {palette.map((colour, index) => {
          return (
            <S.ListItem key={index}>
              <S.ColourBlock colour={colour}>
                  <S.ColourSelect onClick={() => onColourClicked(colour)}>
                      <span>&times;</span>
                  </S.ColourSelect>
              </S.ColourBlock>
            </S.ListItem>
          )
        })}
      </ul>
    </div>
  )
};

export default StagedPalette;