import React, { useState, useEffect, useRef } from 'react';
import DragDrop from './drag-drop';
import ColorThief from 'colorthief';

export default () => {
  const colorThief = new ColorThief();
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef(null);
  const imageUploadButton = useRef(null);
  const [paletteCount, setPaletteCount] = useState(1);
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    if (!imageRef.current) return;

    stealPalette().then((palette) => { setPalette(palette); });
  }, [paletteCount]);

  const stealPalette = () => {
    return new Promise((resolve, reject) => {
      const imagePalette = colorThief.getPalette(imageRef.current, paletteCount);

      if (paletteCount <= 4) { // colour thief has trouble with palettes of less than 4
        while (imagePalette.length > paletteCount) {
          imagePalette.pop();
        }
      }

      let rgbPalette = [];

      for (const color of imagePalette)
      {
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        rgbPalette.push(rgbColor);
      }

      resolve(rgbPalette);
    });
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

  useEffect(() => {
    if (!imageRef.current) return;

    if (!imageSrc) return;

    stealPalette()
      .then((palette) => { setPalette(palette); });

  }, [imageSrc]);

  const handleImageDrop = ({ files }) => {
    const containsSingleFile = files && files.length === 1;
    if (!containsSingleFile) {
      console.log('More/less than one file dropped');
      return;
    }

    const file = files[0];

    const isInAcceptedImageFormat = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isInAcceptedImageFormat) {
      console.log('not an image');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      setImageSrc(imageUrl);
    };

    reader.readAsDataURL(file);

    imageUploadButton.current.value = ''; // clear file input in case user re-uploads same image
  };

  const renderImage = () => {
    return (
      <img 
        ref={imageRef}
        src={imageSrc}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    );
  };

  const clearImage = () => {
    setPalette([]);
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

    canvas.width = palette.length * 100;
    canvas.height = 100;

    let position = 0;

    for (const color of palette) {
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

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px' 
      }}
    >
      <DragDrop handleDrop={handleImageDrop}>
        <div 
          style={{
            padding: '5px',
            boxSizing: 'border-box',
            width: '100%', 
            height: '500px', 
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              width: '100%',
              border: '1px dashed black',
              boxSizing: 'border-box'
            }}
          >

            {
              imageSrc ? (
                renderImage()
              ) : (
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <p style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '5px', margin: '0' }}>
                    <span>Drag & Drop to Upload Image</span>
                    <span>OR</span>
                  </p>
                  <button type="button" onClick={() => { imageUploadButton.current.click(); }}>Upload Image</button>
                </div>
              )
            }

          </div>
        </div>
      </DragDrop>
      {/* <button type="button" onClick={getRandomImage}>Get Random Image</button> */}
      <p>Value: {paletteCount}</p>
      <input type="range" min="1" max="10" value={paletteCount} onChange={(e) => { setPaletteCount(e.target.value); }} />
      
      <p>Palette:</p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        {
          palette.map(color => (
            <div>
              <p>RGB: {color}</p>
              <p>Hex: #{convertRgbToHex(color)}</p>
              <div style={{ backgroundColor: color, width: '100px', height: '100px'}}></div>
            </div>
          ))
        }
      </div>
      <button type="button" onClick={downloadPalette}>Download Palette</button>
      <input ref={imageUploadButton} type="file" onChange={(e) => { handleImageDrop(e.target); }} style={{ display: 'none' }} />
      <button type="button" onClick={clearImage}>Clear Image</button>
    </div>
  );
}