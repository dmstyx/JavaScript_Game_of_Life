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

const buildFrame = frame();

populateFrame(buildFrame);

console.log(buildFrame);

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

functionNextGen