const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth * .9;
canvas.height = innerHeight * .9

let colors = [
    "#fd5901",
    "#f78104",
    "#faab36",
    "#249ea0",
    "#008083",
    "#005f60"
]

function setColor(){
    const index = Math.ceil(random(0, colors.length - 1));
    return colors[index];
}

function clear(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function random(min, max){
    return (Math.random() * (max - min) + min);
}


class Field{
    constructor(amount){
        this.amount = amount;
        this.draw = this.draw.bind(this);
    }
    draw(){
        let margin = 0;
        for (let i = 0; i < this.amount; i++){
            const x = random(50 + margin, canvas.width - 50 - margin);
            const y = random(50 + margin, canvas.height - 50 - margin);
            const size = random(((canvas.width + canvas.height) / 2) / 60, ((canvas.width + canvas.height) / 2) / 25);
            const circles = new Circles([
                size,
                {coordinates: {
                    x: x,
                    y: y,
                }}
            ]);
            circles.draw();
        }
    }
}

class Circles{
    constructor([radius, {coordinates}]){
        this.radius = radius;
        this.coordinates = coordinates;
        this.amount = Math.ceil(random(10, 20));
        this.color = colors[Math.round(random(0, colors.length - 1))];
        ctx.strokeStyle = this.color;
    }
    draw(){
        let circleRadius = this.radius;
        ctx.beginPath();
        ctx.arc(this.coordinates.x, this.coordinates.y, circleRadius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = this.color;
        for (let i = 0; i < this.amount; i++){
            const lineWidth = random(1, 3.5);
            const radius = Math.ceil(this.radius / 6.75) * random(0.25, 1.5);
            
            circleRadius -= radius;
            if (circleRadius < 0){
                circleRadius = random(5, 7);
            }
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(this.coordinates.x, this.coordinates.y, circleRadius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
        }
    }
}


const square = Math.sqrt(canvas.width * canvas.height);

function changeColor(event){
    const value = event.srcElement.value;
    const number = event.srcElement.className.split(' ')[1].split('').filter(el => el * 1) - 1;
    
    event.path[1].childNodes[3].innerHTML = value;
    colors.splice(number, 1, value);
    
    clear();
    field = new Field(square);
    field.draw();

    console.log(colors)
}

canvas.addEventListener('click', () => {
    console.log('You clicked on canvas.');
    clear();
    field = new Field(square);
    field.draw();
})

window.addEventListener('resize', () => {
    console.log('You resized the window.');
    canvas.width = innerWidth * .9;
    canvas.height = innerHeight * .9;
    clear();
    field = new Field(square);
    field.draw();
})

const circle = new Circles([
    75, 
    {coordinates: {
        x: 50, 
        y: 50
    }}
]);

let field = new Field(square);

field.draw();