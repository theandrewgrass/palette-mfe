import React, { useRef, useEffect, useState } from 'react';

// TODO: make drag and drop into react hook

const DragDrop = (props) => {
    const { 
      handleDrop,
      children } = props;

    const dropRef = useRef(null); // reference to the drop area
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
      const dropArea = dropRef.current;
      setup(dropArea);
      return () => cleanup(dropArea);
    }, []);

    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!e.dataTransfer.items || e.dataTransfer.items.length < 1) {
        console.log('no items');
        return;
      }
      setDragging(true);
    };

    const onDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setDragging(false);
    };

    const onDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      handleDrop(e.dataTransfer);

      setDragging(false);
      e.dataTransfer.clearData();
    };

    const setup = (el) => {
      el.addEventListener('dragenter', onDragEnter);
      el.addEventListener('dragover', onDragOver);
      el.addEventListener('dragleave', onDragLeave);
      el.addEventListener('drop', onDrop);
    }

    const cleanup = (el) => {
      el.removeEventListener('dragenter', onDragEnter);
      el.removeEventListener('dragover', onDragOver);
      el.removeEventListener('dragleave', onDragLeave);
      el.removeEventListener('drop', onDrop);
    };

    return (
        <div style={{ height: "100%" }} ref={dropRef}>
            {children}
        </div>
    );
}

export default DragDrop;