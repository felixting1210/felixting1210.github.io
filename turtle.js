const NUM_TURTLES = 5; 
const BASE_SPEED = 0.4;
const TURTLE_SIZE = 60; // 近似乌龟尺寸，用于碰撞检测
const COLLIDE_DISTANCE = 50; 
const turtles = [];

const container = document.getElementById("turtle-container");

for (let i = 0; i < NUM_TURTLES; i++) {
  const turtle = document.createElement("img");
  turtle.src = "assets/spaceturtle.png";
  turtle.classList.add("turtle");

  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  const angle = Math.random() * 2 * Math.PI;

  container.appendChild(turtle);
  turtles.push({
    el: turtle,
    posX,
    posY,
    angle,
    speed: BASE_SPEED
  });
}

function animate() {
  const margin = TURTLE_SIZE;
  const maxX = window.innerWidth - margin;
  const maxY = window.innerHeight - margin;
  const minX = margin;
  const minY = margin;

  // 更新每只乌龟
  turtles.forEach((t, i) => {
    // 微调角度
    t.angle += (Math.random() - 0.5) * 0.01;

    // 计算下一步位置
    let vx = Math.cos(t.angle) * t.speed;
    let vy = Math.sin(t.angle) * t.speed;
    t.posX += vx;
    t.posY += vy;

    // 边界检测 & 平滑反弹
    if (t.posX < minX) { t.posX = minX; t.angle = Math.random() * Math.PI - Math.PI/2; }
    else if (t.posX > maxX) { t.posX = maxX; t.angle = Math.random() * Math.PI + Math.PI/2; }
    if (t.posY < minY) { t.posY = minY; if (t.angle > 0) t.angle = Math.random() * Math.PI; }
    else if (t.posY > maxY) { t.posY = maxY; if (t.angle > 0) t.angle = Math.random() * Math.PI + Math.PI; }

    // 碰撞检测
    for (let j = 0; j < turtles.length; j++) {
      if (i === j) continue;
      const other = turtles[j];
      const dx = t.posX - other.posX;
      const dy = t.posY - other.posY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < COLLIDE_DISTANCE) {
        // 触发弹开
        const angleAway = Math.atan2(dy, dx);
        t.angle = angleAway + (Math.random() - 0.5) * 0.5; // 随机偏移
        t.speed = BASE_SPEED * 3; // 碰撞加速
      }
    }

    // 逐渐恢复正常速度
    if (t.speed > BASE_SPEED) t.speed -= 0.05;

    // 应用样式
    t.el.style.position = "absolute";
    t.el.style.left = `${t.posX}px`;
    t.el.style.top = `${t.posY}px`;
    t.el.style.transform = `translate(-50%, -50%) rotate(${t.angle * 180 / Math.PI}deg)`;
  });

  requestAnimationFrame(animate);
}

window.onload = animate;
window.addEventListener("resize", () => {});
