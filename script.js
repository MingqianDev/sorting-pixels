let img;
let pixel = [];
function preload() {
    img = loadImage('images/cat.jpg');
}
const x = 632;
const y = 475;

function setup() {
    createCanvas(x, y);
    image(img, 0, 0);
    colorMode(HSB);

    for (let w = 0; w < x; w++) {
        for (let h = 0; h < y; h++) {
            pixel.push(get(w,h)); // Get and store the color of each pixel
        }
    }
    // console.log(pixel);
    quickSort(0, pixel.length - 1, pixel);
    console.log(pixel);

    clear();

    let index = 0;
    for (let w = 0; w < x; w++) {
        for (let h = 0; h < y; h++) {
            stroke(pixel[index]);    
            point(w, h); //Draw a point at position (w, h) with the current color
            index++;
        }
    }
    console.log(get(0,0));
    console.log(get(452,438));
}


function compareLess(a, b) {
    if (a[0] < b[0]) {
        return true;
    } else if (a[0] > b[0]) {
        return false;
    }

    if (a[1] < b[1]) {
        return true;
    } else if (a[1] > b[1]) {
        return false;
    }

    return a[2] < b[2];
}

function compareMore(a, b) {
    if (a[0] > b[0]) {
        return true;
    } else if (a[0] < b[0]) {
        return false;
    }

    if (a[1] > b[1]) {
        return true;
    } else if (a[1] < b[1]) {
        return false;
    }

    return a[2] > b[2];
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(L, R, pixel) {
    let less = L - 1; //)___
    let more = R; //___(
    while (L < more) {
        if (compareLess(pixel[L], pixel[R])) {
            less++;
            swap(pixel, less, L);
            L++;
        } else if (compareMore(pixel[L], pixel[R])) {
            more--;
            swap(pixel, more, L);
        } else {
            L++;
        }
    }
    swap(pixel, more, R);
    return [less + 1, more];
}

function quickSort(L, R, pixel) {
    if (L < R) {
        const randomIndex = L + Math.floor(Math.random() * (R - L + 1));
        swap(pixel, randomIndex, R);

        let p = partition(L, R, pixel);
        quickSort(L, p[0] - 1, pixel);
        quickSort(p[1] + 1, R, pixel);
    }
}