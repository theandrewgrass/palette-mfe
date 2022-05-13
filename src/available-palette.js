import React from 'react';
import styled from 'styled-components';

let S = {};

S.List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  padding: 15px;
  box-sizing: border-box;
  list-style: none;
  min-height: 120px;
  overflow-y: overlay;
  height: 240px;
  box-shadow: 5px 5px 10px dimgrey;

  &:after {
    content: '';
    flex: auto;
  }
`;

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
  border: 5px solid white;
  outline: ${props => props.selected ? '1px solid black' : 'none'};
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

const AvailablePalette = ({ palette, selectedColours, onColourSelected }) => {
  return (
    <div>
      <p>Available Palette</p>
      <S.List>
        {palette.map((colour, index) => {
          const selected = selectedColours.includes(colour);
          return (
            <S.ListItem key={index}>
              <S.ColourBlock colour={colour} selected={selected}>
                <S.ColourSelect onClick={() => onColourSelected(colour)}>
                  { 
                    selected ? (
                      <span>&times;</span>
                    ) : ( 
                      <span>+</span>
                    )
                  }
                </S.ColourSelect>
              </S.ColourBlock>
            </S.ListItem>
          )
        })}
      </S.List>
    </div>
  )
};

export default AvailablePalette;