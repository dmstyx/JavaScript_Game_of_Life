const canvas = document.querySelector('canvas');
let seed = document.querySelector('#seed');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'pink';
ctx.fillRect(10, 10, 800, 500);
canvas.width = 800;
canvas.height = 500;


const resolution = 10;
const column = canvas.width / resolution;
const rows = canvas.height /resolution;

function getRandomInt() {
    return Math.floor(Math.random() * 2);
  }

function frame(){
    return new Array(column).fill(null)
        .map(() => new Array(rows).fill(0)
        .map(()=> Math.floor(Math.random() * 2)));    
}

let buildFrame = frame();

requestAnimationFrame(update);

function update(){
    buildFrame = nextGen(buildFrame);
    populateFrame(buildFrame);
    requestAnimationFrame(update);
}


function nextGen(buildFrame){
    const nextGen =buildFrame.map(arr => [...arr]);

    for (let col = 0; col < buildFrame.length; col++){
        for (let row = 0; row < buildFrame[col].length; row++){
            const pixel = buildFrame[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++){
                for (let j = -1; j < 2; j++){
                    if (i === 0 && j === 0){
                        continue;
                    }

                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < column && y_cell < rows){
                        const currentNeighbour = buildFrame[col + i][row + j];
                        numNeighbours += currentNeighbour;
                    }
                    
                }
            }

            if (pixel === 1 && numNeighbours < 2){
                nextGen[col][row] = 0;
            } else if (pixel === 1 && numNeighbours > 3){
                nextGen[col][row] = 0;
            }else if (pixel === 0 && numNeighbours === 3){
                nextGen[col][row] = 1;
            }
        }
    }

    return nextGen;
}


function populateFrame(buildFrame){
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