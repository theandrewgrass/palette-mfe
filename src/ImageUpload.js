import React, { useRef } from 'react';
import DragDrop from './drag-drop';

const ImageUpload = ({ onImageUpload }) => {

  const imageUploadButton = useRef(null);

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
      onImageUpload(imageUrl);
    };

    reader.readAsDataURL(file);

    imageUploadButton.current.value = ''; // clear file input in case user re-uploads same image
  };

  return (
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
          <input ref={imageUploadButton} type="file" onChange={(e) => { handleImageDrop(e.target); }} style={{ display: 'none' }} />
        </div>
      
        </div>
      </div>
    </DragDrop>
  );
};

export default ImageUpload;