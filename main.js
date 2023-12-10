const Neboer = document.getElementById("Neboer");
const Neboer_container = document.getElementById("Neboer_container");
const notice = document.getElementById("notice");

const ade = 0.067;
const ain = 0.096;

let hold = false;
let distX, distY;
let Vx = 0, Vy = 0.01;
let time_freeze = false;
let xtime = 0, ytime = 0;

Neboer.addEventListener("mousedown", clickon);
Neboer.addEventListener("mousemove", move);
Neboer.addEventListener("mouseup", clickoff);

freeze();

function freeze() {
    const theWorld = document.getElementById("theworld");
    if(time_freeze) {
        time_freeze = false;
        theWorld.innerHTML = "时间静止";
        theWorld.style.backgroundColor = "";
        xtime = 0;
        ytime = 0;
        if (Vy === 0) {
            Vy = 0.01;
        }
        moveNeboer();
    } else {
        time_freeze = true;
        theWorld.innerHTML = "时间已静止！";
        theWorld.style.backgroundColor = "yellow";
    }
}

function clickon(e) {
    hold = true;
    Neboer.style.cursor = "grabbing";
    distX = e.clientX - Neboer.getBoundingClientRect().left;
    distY = e.clientY - Neboer.getBoundingClientRect().top;
    Vx = 0;
    Vy = 0;
}

function move(e) {
    if(hold) {
    let x = e.clientX - distX - Neboer_container.getBoundingClientRect().left;
    let y = e.clientY - distY - Neboer_container.getBoundingClientRect().top;
    Neboer.style.left = `${x}px`;
    Neboer.style.top = `${y}px`;
    // if(Neboer.getBoundingClientRect().top < Neboer_container.getBoundingClientRect().top || Neboer.getBoundingClientRect().left < Neboer_container.getBoundingClientRect().left) {
    //     console.log(6);
    // }
}
}

function clickoff(e) {
    hold = false;
    Neboer.style.cursor = "grab";
    Vy = 0.01
}

function speed_init() {
    Vx = 0;
    Vy = 0;
    notice.innerHTML = "实验提示器：目前未设置速度";
}

function speed_get(a) {
    const speed = document.getElementById("speed")
    if(a === 0) {
        Vx = speed.value;
} else if(a === 1) {
    Vy = speed.value;
    }
    if(Vx !== 0 || Vy !== 0) {
        notice.innerHTML = `实验提示器：当前横向速度为${Vx}，纵向速度为${Vy}`;
    } else {
        notice.innerHTML = "您的实验数据输入失败，请重新输入"
        Vx = 0;
        Vy = 0;
    }
}

function moveNeboer() {
    let x = Neboer.getBoundingClientRect().left - Neboer_container.getBoundingClientRect().left - 5;
    let y = Neboer.getBoundingClientRect().top - Neboer_container.getBoundingClientRect().top - 5;
    Neboer.style.left = `${x + Vx}px`;
    Neboer.style.top = `${y + Vy}px`;
    if (Vx > 0) {
        Vx -= ade;
    } else if (Vx < 0){
    Vx += ade;
    }

    if (Vy > 0) {
        Vy += ade;
    } else if (Vy < 0) {
        Vy += ain;
    }

    if (x + Vx < 0 || x + Vx > Neboer_container.getBoundingClientRect().width - 60) {
        Vx = -Vx;
    }
    if (y + Vy < 0 || y + Vy > Neboer_container.getBoundingClientRect().height - 60) {
        Vy = -Vy;
    }
    notice.innerHTML = `实验提示器：当前横向速度为${Vx}，纵向速度为${Vy}`;

    if (Vx < 0.08 && Vx !== 0) {
        xtime += 1;
    }
    if (Vy < 0.08 && Vy !== 0) {
        ytime += 1;
    }
    if (xtime >= 900) {
        Vx = 0;
        xtime = 0;
    }
    if (ytime >= 900) {
        Vy = 0;
        ytime = 0;
    }
    if(!time_freeze) {
        requestAnimationFrame(moveNeboer);
}
}
