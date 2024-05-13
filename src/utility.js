import { saveAs } from 'file-saver';

/**
 * Generates and downloads a PNG image from a grid of hex color values.
 * 
 * @param {number} pixelSize - The size of each pixel in the image.
 * @param {Array<string>} drawing - An array of hex colors representing the image grid.
 * @param {number} width - The number of pixels in each row of the image.
 */
export const downloadImage = (numOfPixels, drawing, backgroundColor) => {

  const canvas = document.createElement('canvas');
  
  // Set the width and height of the canvas
  console.log(numOfPixels)
  canvas.width = numOfPixels;
  canvas.height = numOfPixels;
  
  // Get the context of the canvas
  const ctx = canvas.getContext('2d');
  
  // Set a fill color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, numOfPixels, numOfPixels);
  
  // Fill the entire canvas
  for(let i = 0; i <= (numOfPixels*numOfPixels);i++){
    //console.log(drawing[i], i, numOfPixels)
    if(drawing[i]){
      let x = i%numOfPixels;
      let y = Math.floor(i/numOfPixels);
      ctx.fillStyle = drawing[i];
      ctx.fillRect(x, y, 1, 1);
    }
  }
  // Convert the canvas to a Blob and then download it as a PNG
  canvas.toBlob(blob => {
    saveAs(blob, 'drawing.png');
  });
};

