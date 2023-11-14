var imageno = 1;
displaying(imageno);

function nextimg(n) {
    displaying(imageno += n)
}

function currentSlide(n) {
    displaying(imageno = n)
}

function displaying(n) {
    var i;
    var image = document.getElementsByClassName("image");

    if (n > image.length) {
        imageno = 1;
    }

    if (n < 1) {
        imageno = image.length;
    }

    for (i = 0; i < image.length; i++) {
        image[i].style.display = "none";
    }

    image[imageno - 1].style.display = "block";
}

let amountElement = document.getElementById('amount');
let amount = amountElement.value;

let render = (amount) => {
    amountElement.value = amount;
}

let handlePlus = () => {
    amount++;
    render(amount);
}

let handleMinus = () => { 
    if (amount > 1)
        amount--;
    render(amount);
}

amountElement.addEventListener('input', () => {
    amount = amountElement.value;
    amount = parseInt(amount);
    amount = isNaN(amount)?1:amount;
    render(amount);
});