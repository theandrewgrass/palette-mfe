import React from 'react';
import styled from 'styled-components';

const S = {};

S.StagedPalette = styled.section`
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 1px;
  box-shadow: 1px 1px 2px dimgrey;
`;

S.List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
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
  box-shadow: 1px 1px 2px dimgrey;
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
    <S.StagedPalette>
      <S.List>
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
      </S.List>
    </S.StagedPalette>
  )
};

export default StagedPalette;