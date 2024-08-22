let video;
let poseNet;
let noseX = 0;
let noseY = 0;

function preload() {
    // Função deixada vazia para o próximo projeto
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('myCanvas');
    canvas.center();

    // Acessar a webcam
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide(); // Ocultar o componente extra criado por p5.js

    // Inicializar o PoseNet
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    // Exibir o vídeo da webcam na tela
    image(video, 0, 0, width, height);

    // Desenhar uma elipse na posição do nariz
    fill(255, 0, 0);
    ellipse(noseX, noseY, 20, 20);
}

function modelLoaded() {
    console.log('PoseNet foi inicializado.');
}

function gotPoses(poses) {
    if (poses.length > 0) {
        // Ler as coordenadas x e y do nariz
        noseX = poses[0].pose.nose.x;
        noseY = poses[0].pose.nose.y;
    }
}

function onClick() {
    saveCanvas(canvas, 'imagem-com-filtro', 'jpg');
}
