const canvas = document.querySelector('canvas'); // Grab canvas div 
let seed = document.querySelector('#seed');     // Grab initialisation button
const ctx = canvas.getContext('2d');    // Create a 2d canvas object


canvas.width = 800;                     // Set Canvas dimensions
canvas.height = 500;


const resolution = 10;                      // set the size of each cell in pixels
const column = canvas.width / resolution;  
const rows = canvas.height /resolution;


function frame(){                               // Make columns and rows
    return new Array(column).fill(null)
        .map(() => new Array(rows).fill(0)
        .map(()=> Math.floor(Math.random() * 2)));    // Fill cells with either 1 or 0
}

let buildFrame = frame();

setTimeout(function(){
    requestAnimationFrame(update); // Tell browser to animate build
    } , 2000);
 

function update(){
    buildFrame = nextGen(buildFrame);
    populateFrame(buildFrame);
    requestAnimationFrame(update);
}


function nextGen(buildFrame){
    const nextGen =buildFrame.map(arr => [...arr]);     // Make copy of frame

    for (let col = 0; col < buildFrame.length; col++){
        for (let row = 0; row < buildFrame[col].length; row++){
            const pixel = buildFrame[col][row];
            let numNeighbours = 0;                      // Grab neighbouring cells
            for (let i = -1; i < 2; i++){               // Arrange sequence iteration
                for (let j = -1; j < 2; j++){
                    if (i === 0 && j === 0){            
                        continue;
                    }

                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < column && y_cell < rows){ // Omit pixels that are out of bounds
                        const currentNeighbour = buildFrame[col + i][row + j];
                        numNeighbours += currentNeighbour;
                    }
                    
                }
            }

            if (pixel === 1 && numNeighbours < 2){  // If less than 2 cells are alive
                nextGen[col][row] = 0;
            } else if (pixel === 1 && numNeighbours > 3){   // If more than 3 cells are alive
                nextGen[col][row] = 0;
            }else if (pixel === 0 && numNeighbours === 3){  // If 3 cells are alive
                nextGen[col][row] = 1;
            }
        }
    }

    return nextGen;
}


function populateFrame(buildFrame){     // Build initial frame
    for (let column = 0; column < buildFrame.length; column++){
        for (let rows = 0; rows < buildFrame[column].length; rows++){
            const pixel = buildFrame[column][rows];
            ctx.beginPath();
            ctx.rect(column * resolution, rows * resolution, resolution, resolution);
            ctx.fillStyle = pixel ? 'black' : 'white';
            ctx.fill()
        }
    }
}