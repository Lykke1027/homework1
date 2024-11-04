let font;  // 載入字型文字
let points = [];  // 儲存轉成點陣的文字座標
let angleX = 0;  // 控制文字繞 X 軸旋轉的角度
let angleY = 0;  // 控制文字繞 Y 軸旋轉的角度

function preload() {
  font = loadFont("fonts/Roboto-Black.ttf");  // 載入字型檔案
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);  // 設定 WEBGL 模式
  background(220);  // 畫布背景顏色
  angleMode(DEGREES);  // 角度模式，範圍 0~360
}

function draw() {
  background("#ffd4ca");  // 每次繪製前重設背景
  
  noFill();  // 不填滿圖形
  stroke("#F06545");  // 線條顏色
  strokeWeight(5);  // 線條寬度

  let r_w = 60 + mouseX / 50;  // 計算矩形寬度
  let bc_w = 50 + mouseX / 50;  // 計算大圓寬度
  let sc_w = 25 + mouseX / 0;  // 計算小圓寬度

  // 繪製背景的圖形矩陣
  for (let j = 0; j < 25; j++) {
    for (let k = 0; k < 39; k++) {
      push();  // 儲存當前座標系
      translate(25 + bc_w * k - width / 2, 50 * j - height / 2, 0);  // 移動畫布到繪製點
      ellipse(0, 0, bc_w);  // 畫大圓
      rect(-r_w / 2, -r_w / 2, r_w, r_w);  // 畫矩形
      pop();  // 恢復之前的座標系
    }
  }

  // 將字母 'TKUET' 轉成點陣座標
  points = font.textToPoints("TKUET", 0, 0, 200, {
    sampleFactor: 0.07  // 控制點數距離大小
  });

  // 旋轉整體文字
  rotateX(angleX);  // 繞 X 軸旋轉
  rotateY(angleY);  // 繞 Y 軸旋轉
  angleX += 0.5;  // X 軸旋轉角度增量
  angleY += 0.5;  // Y 軸旋轉角度增量

  // 根據時間計算顏色，讓所有點顏色一致
  let col = color(
    (frameCount * 3) % 255,  // R 值隨時間變化
    (frameCount * 1.5) % 255,  // G 值隨時間變化
    (frameCount * 0.5) % 255   // B 值隨時間變化
  );

  for (let i = 0; i < points.length; i++) {
    let x = points[i].x - width / 4;  // 調整 x 座標
    let y = points[i].y - height / 4;  // 調整 y 座標
    let z = sin(angleX + i * 5) * 50;  // 計算 z 座標，使點位有深度變化

    push();  // 儲存當前座標系
    translate(x, y, z);  // 移動到點的位置
    noStroke();  // 無邊框
    fill(col);  // 所有點使用同樣顏色
    ellipse(0, 0, 10);  // 畫出每個點
    pop();  // 恢復座標系
  }
}
