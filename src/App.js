import React, { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import StagedPalette from './staged-palette';
import AvailablePalette from './available-palette';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';

const S = {};

S.GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "ImageUpload"
    "StagedPalette"
    "AvailablePalette"
    "Export";
`;

S.ImageUploadContainer = styled.div`
  grid-area: ImageUpload;
  height: 500px;
`;

S.StagedPaletteContainer = styled.div`
  grid-area: StagedPalette;
`;

S.AvailablePaletteContainer = styled.div`
  grid-area: AvailablePalette;
`;

S.ExportContainer = styled.div`
  grid-area: Export;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export default () => {
  const colorThief = new ColorThief();
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef(null);
  const [stagedPalette, setStagedPalette] = useState([]);
  const [availablePalette, setAvailablePalette] = useState([]);

  const stealPalette = () => {
      
      const paletteSet = new Set();
      
      for (let i = 0; i < 20; i++) {
        const imagePalette = colorThief.getPalette(imageRef.current, i);
        
        for (const color of imagePalette) {
          const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          paletteSet.add(rgbColor);
        }
      }

      const palette = Array.from(paletteSet);

      setStagedPalette(palette.slice(0, 4));
      setAvailablePalette(palette);
    };

  // const locatePalette = () => {
  //   if (!imageRef.current) return;

  //   if (!palette.length) return;

  //   // create a canvas to draw the palette on
  //   const canvas = document.createElement('canvas');

  //   const imageContext = imageRef.current.getContext('2d');
  //   const imageData = imageContext.getImageData(0, 0, imageRef.current.width, imageRef.current.height);
  //   const pixelData = imageData.data;

  //   // scan the image for each colour in the palette
  //   for (const color of palette) {
  //     // scan each pixel in the image
  //     for (let x = 0; x < pixelData.length; x++) {
  //       // if the pixel matches the colour, draw a circle
  //       if (pixelData[x].toString() === color) {
  //         image.drawCircle(x, y, 5, 'red');
  //       }
  //       else {
  //         console.log(pixelData[x].toString());
  //       }
  //     }
  //   }
  // };

  const renderImage = () => {
    return (
      <img 
        ref={imageRef}
        src={imageSrc}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    );
  };

  useEffect(() => {
    if (!imageRef.current) return;

    if (!imageSrc) return;

    stealPalette();

  }, [imageSrc]);

  const clearImage = () => {
    setStagedPalette([]);
    setAvailablePalette([]);
    setImageSrc('');
  }

  const convertRgbToHex = (rgb) => {
    const rgbArray = rgb.split(',');
    const r = parseInt(rgbArray[0].replace('rgb(', '').trim());
    const g = parseInt(rgbArray[1].trim());
    const b = parseInt(rgbArray[2].replace(')', '').trim());

    const hex = [
      r.toString(16),
      g.toString(16),
      b.toString(16)
    ];

    return hex.join('');
  };

  const createPaletteImage = () => {
    // for each colour in the palette, draw a pixel of that colour

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = stagedPalette.length * 100;
    canvas.height = 100;

    let position = 0;

    for (const color of stagedPalette) {
      context.fillStyle = color;
      context.fillRect(position, 0, 100, 100);
      position += 100;
    }

    return canvas.toDataURL();
  };

  const downloadPalette = () => {
    const paletteImage = createPaletteImage();
    const link = document.createElement('a');
    link.download = 'palette.png';
    link.href = paletteImage;
    link.click();
  };

  // TODO: add a proxy to the image url to avoid CORS issues
  // this can be done using cloudflare workers or smth
  // const getRandomImage = () => {
  //   // get a random image from unsplash
  //   const unsplashUrl = 'https://source.unsplash.com/random/700x700';
  //   // go to unsplash url
  //   // wait for redirect
  //   // get the image url
  //   // set the image src

  //   fetch(unsplashUrl)
  //     .then(response => response.url)
  //     .then(url => {
  //       setImageSrc(url);
  //     });
  // };

  const onColourSelected = (colour) => {
    if (stagedPalette.includes(colour)) {
      const newPalette = stagedPalette.filter(stagedColor => stagedColor !== colour);
      setStagedPalette(newPalette);
    } else {
      setStagedPalette([...stagedPalette, colour]);
    }
  };

  const onColourClicked = (colour) => {
    const newPalette = stagedPalette.filter(stagedColor => stagedColor !== colour);
    setStagedPalette(newPalette);
  };

  return (
    <S.GridContainer>
    <S.ImageUploadContainer>
      { imageSrc ? renderImage() : <ImageUpload onImageUpload={setImageSrc} /> }
    </S.ImageUploadContainer>

    { imageSrc &&
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <S.StagedPaletteContainer>
          <StagedPalette palette={stagedPalette} onColourClicked={onColourClicked} />
        </S.StagedPaletteContainer>
        
        <S.AvailablePaletteContainer>
          <AvailablePalette palette={availablePalette} selectedColours={stagedPalette} onColourSelected={onColourSelected} />
        </S.AvailablePaletteContainer>
        
        <S.ExportContainer>
          <button type="button" onClick={downloadPalette}>Download Palette</button>
          <button type="button" onClick={clearImage}>Clear Image</button>
        </S.ExportContainer>
      </div>    
    }
  </S.GridContainer>
  );
}