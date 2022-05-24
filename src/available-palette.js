import React from 'react';
import styled from 'styled-components';

let S = {};

S.AvailablePalette = styled.section`
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;

  &:after {
    content: '';
    flex: auto;
  }
`;

S.ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.ColourBlock = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${props => props.colour};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid white;
  outline: ${props => props.selected ? '1px solid black' : 'none'};
  box-shadow: 1px 1px 2px dimgrey;
  box-sizing: border-box;
`;

S.ColourSelect = styled.button`
  background-color: white;
  font-size: 24px;
  line-height: 30px;
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
    <S.AvailablePalette>
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
    </S.AvailablePalette>
  )
};

export default AvailablePalette;