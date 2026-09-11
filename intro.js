const turtle = document.getElementById("turtle");
const ufo = document.getElementById("ufo");

// 初始 idle 缩放动画（呼吸慢、幅度小）
let idleScale = 1;
let idleDirection = 1;
let idleAnimating = true;

function idleAnimation() {
  if (!idleAnimating) return;
  idleScale += 0.0015 * idleDirection;
  if (idleScale > 1.05) idleDirection = -1;
  if (idleScale < 0.98) idleDirection = 1;
  turtle.style.transform = `translate(-50%, -50%) scale(${idleScale})`;
  requestAnimationFrame(idleAnimation);
}

idleAnimation();

// 飞走函数，单独封装，方便自动触发
function flyAway() {
  idleAnimating = false;

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight * 0.7;
  const duration = 1800;
  const startTime = performance.now();

  function animate(timestamp) {
    let t = (timestamp - startTime) / duration;
    if (t > 1) t = 1;

    // 乌龟飘走
    const moveX = t * window.innerWidth * 0.8 + Math.sin(t * 6) * 30;
    const moveY = -t * window.innerHeight + Math.sin(t * 3) * 20;
    const scale = 1 - t;
    const rotation = t * 45;

    turtle.style.left = `${startX + moveX}px`;
    turtle.style.top = `${startY + moveY}px`;
    turtle.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;

    // UFO 飘走（反方向）
    ufo.src = "assets/ufowithout.png";
    const ufoStartX = window.innerWidth / 2;
    const ufoStartY = window.innerHeight * 0.5;
    const ufoMoveX = -moveX * 0.8;
    const ufoMoveY = -moveY * 0.5;
    ufo.style.left = `${ufoStartX + ufoMoveX}px`;
    ufo.style.top = `${ufoStartY + ufoMoveY}px`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      window.location.href = "index.html";
    }
  }

  requestAnimationFrame(animate);
}

// 点击任意位置触发
document.addEventListener("click", () => {
  if (!idleAnimating) return;
  flyAway();
});

// 自动 4 秒后触发
setTimeout(() => {
  if (idleAnimating) flyAway();
}, 4000);
