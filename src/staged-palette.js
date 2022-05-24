import React, { Fragment } from 'react';
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
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 15px;
  list-style: none;
  padding: 15px;
  margin: 0;
  box-sizing: border-box;

  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  width: 100%;
`;

S.ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

S.ColourBlock = styled.div`
  flex: 1;
  background-color: ${props => props.colour};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 2px dimgrey;
  aspect-ratio: 1;
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

const StagedPalette = ({ palette, onColourClicked }) => {
  return (
    <Fragment>
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
    </Fragment>
  )
};

export default StagedPalette;