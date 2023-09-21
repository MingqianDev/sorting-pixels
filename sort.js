let img;
let pixelArray = [];

function preload() {
  img = loadImage('images/cat.jpg');
}

function setup() {
  createCanvas(632,468);
  image(img, 0, 0);
  loadPixels(); // 加载画布的像素数据

  // 获取图像的每个像素的颜色信息并存储在pixelArray数组中
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let loc = (x + y * width) * 4; // 计算像素在像素数组中的位置
      let r = pixels[loc];
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];
      pixelArray.push(color(r, g, b));
    }
  }

  // 对pixelArray数组进行排序
  pixelArray.sort(compareColors);

  // 使用排序后的颜色信息重新绘制图像
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = x + y * width;
      stroke(pixelArray[index]);
      point(x, y);
    }
  }
}

// 比较函数，用于排序
function compareColors(a, b) {
  let sumA = red(a) + green(a) + blue(a);
  let sumB = red(b) + green(b) + blue(b);
  return sumA - sumB; // 按照颜色值之和升序排序
}
