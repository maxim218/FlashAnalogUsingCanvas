"use strict";

let ppp = document.getElementById("animationProperties");

let mmm = document.getElementById("mouseProperties");

function makeAnimation(){
    for(let i = 0; i < mass.length; i++){
        let kv = mass[i];
        let textOfInput = document.getElementById("t_" + kv.idValue).value.toString();
        let arr = [];
        arr = textOfInput.split(" ");
        let xF = parseInt(arr[0]);
        let yF = parseInt(arr[1]);
        kv.xF = xF;
        kv.yF = yF;

        if(kv.x < kv.xF){
            kv.speedX = 1;
        } else {
            kv.speedX = -1;
        }

        if(kv.y < kv.yF){
            kv.speedY = 1;
        } else {
            kv.speedY = -1;
        }
    }

    function animateAllObjects(){
        for(let i = 0; i < mass.length; ++i){
            let kv = mass[i];
            if(kv.x !== kv.xF) {
                kv.x += kv.speedX;
            }
            if(kv.y !== kv.yF){
                kv.y +=  kv.speedY;
            }
        }

        drawAll();
    }

    let intervalForAnimation = setInterval(animateAllObjects, 40);
}

function addPropertiesOfElementToScreen(kv){
    ppp.innerHTML += (kv.idValue + "&nbsp;&nbsp;&nbsp;");
    const fieldId = "t_" + kv.idValue;
    ppp.innerHTML += ("<input type = 'text' id = '" + fieldId + "' placeholder = '" + fieldId + "'><br>");
}

let can = document.getElementById('can');
let holst = can.getContext('2d');

holst.lineWidth = 2;
holst.strokeStyle = '#000000';

let mass = [];

function getRandomColor(){
    let arr = ["#ff2415", "#82ff30", "#4e66ff", "#666666", "#CCCCFF", "#0000FF", "#FF0000"];
    let number = parseInt(Math.random() * 10000);
    return arr[number % arr.length];
}

function drawAll(){
    holst.clearRect(0,0,700,300);
    for(let i = 0; i < mass.length; i++){
        mass[i].draw();
    }
}

function createKv(){
    let kv = {
        x: 0,
        y: 0,
        colorValue: getRandomColor(),
        idValue: "kv_" + mass.length.toString()
    };

    kv.draw = function(){
        holst.fillStyle = this.colorValue;
        holst.fillRect(this.x, this.y, 100, 100);
        holst.strokeRect(this.x, this.y, 100, 100);
    };

    mass.push(kv);

    drawAll();

    addPropertiesOfElementToScreen(kv);
}

function hitTest(xx,yy,xKv,yKv){
    if(xKv <= xx && xx <= xKv + 100){
        if(yKv <= yy && yy <= yKv + 100){
            return true;
        }
    }
    return false;
}

can.onmousedown = down;
can.onmouseup = up;
can.onmousemove = go;
can.onmouseout = up;

let flag = false;
let number = -1;
let rX = -1;
let rY = -1;

function down(e){
    let xx = e.pageX - can.offsetLeft;
    let yy = e.pageY - can.offsetTop;

    flag = true;
    for(let i = 0; i < mass.length; i++){
        if(hitTest(xx,yy,mass[i].x, mass[i].y) === true){
            number = i;
            rX = xx - mass[i].x;
            rY = yy - mass[i].y;
        }
    }
}

function up(){
    flag = false;
    number = -1;
    rX = -1;
    rY = -1;
}

function go(e){
    let xx = e.pageX - can.offsetLeft;
    let yy = e.pageY - can.offsetTop;

    mmm.innerHTML = "Xm = " + xx + "&nbsp;&nbsp;&nbsp;Ym = " + yy;

    if(flag === true){
        if(number !== -1){
            if(rX !== -1 && rY !== -1) {
                mass[number].x = xx - rX;
                mass[number].y = yy - rY;
                drawAll();
            }
        }
    }
}
