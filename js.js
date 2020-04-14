changeColor();

function changeColor() {
    const randomColor = getRandomColor();
    console.log(randomColor);
    document.body.style.backgroundColor = randomColor;
}

function getRandomColor() {
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
}
