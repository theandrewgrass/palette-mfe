import React, { useState, useEffect, useRef } from 'react';
import DragDrop from './drag-drop';
import ColorThief from 'colorthief';

export default () => {
  const colorThief = new ColorThief();
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef(null);
  const imageUploadButton = useRef(null);
  const [thiefColor, setThiefColor] = useState();

  useEffect(() => {
    if (imageRef.current)
    {
      const color = colorThief.getColor(imageRef.current);
      console.log(color);
      const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      setThiefColor(colorString);
    }
  }, [imageSrc]);

  const handleImageDrop = ({ files }) => {
    const containsSingleFile = files && files.length === 1;
    if (!containsSingleFile) {
      return;
    }

    const file = files[0];

    const isInAcceptedImageFormat = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isInAcceptedImageFormat) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      setImageSrc(imageUrl);
    };

    reader.readAsDataURL(file);
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

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      setImageSrc(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageSrc('');
    setThiefColor('');
  }

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
      <div style={{ backgroundColor: thiefColor, width: '50px', height: '50px'}}></div>
      <input ref={imageUploadButton} type="file" onChange={(e) => { handleImageDrop(e.target); }} style={{ display: 'none' }} />
      <button type="button" onClick={clearImage}>Clear Image</button>
    </div>
  );
}