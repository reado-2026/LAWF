const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const loaderWrapper = document.querySelector(".loader-wrapper");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const heartCanvasContainer = document.getElementById("heart-canvas-container");

// --- No Button Movement ---
noBtn.addEventListener("mouseover", () => {
    const rect = questionContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = rect.width - btnRect.width;
    const maxY = rect.height - btnRect.height;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    noBtn.style.position = "absolute";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

// --- Three.js 3D Particle Heart Setup ---
let scene, camera, renderer, particles, geometry, vertices, tl;
function initThreeHeart() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.z = 500;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    heartCanvasContainer.appendChild(renderer.domElement);
    tl = gsap.timeline({ repeat: -1, yoyo: true });
    const path = document.querySelector("#heart-svg-path path");
    const length = path.getTotalLength();
    vertices = [];
    for (let i = 0; i < length; i += 0.2) {
        const point = path.getPointAtLength(i);
        const vector = new THREE.Vector3(point.x, -point.y, 0);
        vector.x += (Math.random() - 0.5) * 30;
        vector.y += (Math.random() - 0.5) * 30;
        vector.z += (Math.random() - 0.5) * 70;
        vertices.push(vector);
        tl.from(vector, { x: 600 / 2, y: -552 / 2, z: 0, ease: "power2.inOut", duration: Math.random() * 3 + 2 }, i * 0.002);
    }
    geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const material = new THREE.PointsMaterial({ color: 0xff6b81, blending: THREE.AdditiveBlending, size: 3 });
    particles = new THREE.Points(geometry, material);
    particles.position.x -= 600 / 2;
    particles.position.y += 552 / 2;
    scene.add(particles);
    gsap.fromTo(scene.rotation, { y: -0.2 }, { y: 0.2, repeat: -1, yoyo: true, ease: 'power2.inOut', duration: 3 });
    animateThree();
}
function animateThree() {
    requestAnimationFrame(animateThree);
    geometry.setFromPoints(vertices);
    renderer.render(scene, camera);
}

// --- Mo.js Animation Setup (The "Perfect" Version) ---
const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path("M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");

const el = {
    container: qs("#mo-animation-container .mo-inner"),
    i: qs(".lttr--I"),
    l: qs(".lttr--L"),
    o: qs(".lttr--O"),
    v: qs(".lttr--V"),
    e: qs(".lttr--E"),
    y: qs(".lttr--Y"),
    o2: qs(".lttr--O2"),
    u: qs(".lttr--U"),
    lineLeft: qs(".line--left"),
    lineRight: qs(".line--rght"),
    colTxt: "#ff6b81",
    colHeart: "#ff4757",
    blup: qs(".blup"),
    blop: qs(".blop")
};

const volume = 0.2;
if (el.blup) el.blup.volume = volume;
if (el.blop) el.blop.volume = volume;

class Heart extends mojs.CustomShape {
    getShape() { return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>'; }
    getLength() { return 200; }
}
mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
    const parent = el.container;
    const crcl = new mojs.Shape({
        shape: "circle", fill: "none", stroke: el.colTxt, strokeWidth: { 5: 0 },
        radius: { [rd]: [rd + 20] }, easing: "quint.out", duration: 500 / 3, parent, delay, x
    });
    const brst = new mojs.Burst({
        radius: { [rd + 15]: 110 }, angle: "rand(60, 180)", count: 3, timeline: { delay },
        parent, x,
        children: {
            radius: [5, 3, 7], fill: el.colTxt, scale: { 1: 0, easing: "quad.in" },
            pathScale: [0.8, null], degreeShift: ["rand(13, 60)", null], duration: 1000 / 3, easing: "quint.out"
        }
    });
    return [crcl, brst];
};

function startMoAnimation() {
    const move = 1000;
    const boom = 200;
    const easing = "sin.inOut";
    const easingBoom = "sin.in";
    const easingOut = "sin.out";
    const opts = { duration: move, easing, opacity: 1 };
    const delta = 150;

    const timeline = new mojs.Timeline().add([
        new mojs.Tween({
            duration: move,
            onStart: () => {
                [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(letter => {
                    letter.style.opacity = 0;
                });
            },
            onComplete: () => {
                [el.l, el.o, el.v, el.e].forEach(letter => letter.style.opacity = 0);
                if (el.blop) el.blop.play();
            }
        }),

        new mojs.Tween({
            duration: move * 2 + boom,
            onComplete: () => {
                [el.y, el.o2].forEach(letter => letter.style.opacity = 0);
                if (el.blop) el.blop.play();
            }
        }),

        new mojs.Tween({
            duration: move * 3 + boom * 2 - delta,
            onComplete: () => {
                el.i.style.opacity = 0;
                if (el.blop) el.blop.play();
            }
        }),

        new mojs.Tween({
            duration: move * 3 + boom * 2,
            onComplete: () => {
                el.u.style.opacity = 0;
                if (el.blup) el.blup.play();
            }
        }),

        new mojs.Tween({
            duration: move * 3 + boom * 2 + 500,
            onComplete: () => {
                gsap.to("#mo-animation-container", {
                    opacity: 0, duration: 1, onComplete: () => {
                        document.getElementById("mo-animation-container").style.display = "none";
                    }
                });
                showFinalResult();
            }
        }),

        // Lines
        new mojs.Html({ ...opts, el: el.lineLeft, x: { 0: 52 } })
            .then({ duration: boom + move, easing, x: { to: 52 + 54 } })
            .then({ duration: boom + move, easing, x: { to: 52 + 54 + 60 } })
            .then({ duration: 150, easing, x: { to: 52 + 54 + 60 + 10 } })
            .then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),

        new mojs.Html({ ...opts, el: el.lineRight, x: { 0: -52 } })
            .then({ duration: boom + move, easing, x: { to: -52 - 54 } })
            .then({ duration: boom + move, easing, x: { to: -52 - 54 - 60 } })
            .then({ duration: 150, easing, x: { to: -52 - 54 - 60 - 10 } })
            .then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),

        // Letters
        new mojs.Html({ ...opts, el: el.i, x: { 0: 34 }, opacity: { 0: 1 } })
            .then({ duration: boom, easing: easingBoom, x: { to: 34 + 19 } })
            .then({ duration: move, easing, x: { to: 34 + 19 + 40 } })
            .then({ duration: boom, easing: easingBoom, x: { to: 34 + 19 + 40 + 30 } })
            .then({ duration: move, easing, x: { to: 34 + 19 + 40 + 30 + 30 } }),

        new mojs.Html({ ...opts, el: el.l, x: { 0: 15 }, opacity: { 0: 1 } }),
        new mojs.Html({ ...opts, el: el.o, x: { 0: 11 }, opacity: { 0: 1 } }),
        new mojs.Html({ ...opts, el: el.v, x: { 0: 3 }, opacity: { 0: 1 } }),
        new mojs.Html({ ...opts, el: el.e, x: { 0: -3 }, opacity: { 0: 1 } }),

        new mojs.Html({ ...opts, el: el.y, x: { 0: -20 }, opacity: { 0: 1 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -20 - 33 } })
            .then({ duration: move, easing, x: { to: -20 - 33 - 24 } }),

        new mojs.Html({ ...opts, el: el.o2, x: { 0: -27 }, opacity: { 0: 1 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -27 - 27 } })
            .then({ duration: move, easing, x: { to: -27 - 27 - 30 } }),

        new mojs.Html({ ...opts, el: el.u, x: { 0: -32 }, opacity: { 0: 1 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -32 - 21 } })
            .then({ duration: move, easing, x: { to: -32 - 21 - 36 } })
            .then({ duration: boom, easing: easingBoom, x: { to: -32 - 21 - 36 - 31 } })
            .then({ duration: move, easing, x: { to: -32 - 21 - 36 - 31 - 27 } }),

        // Giant Heart in middle of mo-animation
        new mojs.Shape({
            parent: el.container, shape: "heart", delay: move, fill: el.colHeart, x: -64,
            scale: { 0: 0.95, easing: easingHeart }, duration: 500
        }).then({ x: { to: -62, easing }, scale: { to: 0.65, easing }, duration: boom + move - 500 })
            .then({ duration: boom - 50, x: { to: -62 + 48 }, scale: { to: 0.9 }, easing: easingBoom })
            .then({ duration: 125, scale: { to: 0.8 }, easing: easingOut })
            .then({ duration: 125, scale: { to: 0.85 }, easing: easingOut })
            .then({ duration: move - 200, scale: { to: 0.45 }, easing })
            .then({ delay: -75, duration: 150, x: { to: 0 }, scale: { to: 0.9 }, easing: easingBoom })
            .then({ duration: 350, scale: { to: 0 }, easing: easingOut }),

        ...crtBoom(move, -64, 46),
        ...crtBoom(move * 2 + boom, 18, 34),
        ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
        ...crtBoom(move * 3 + boom * 2, 45, 34)
    ]);

    timeline.play();
}

// --- Sequence Management ---
yesBtn.addEventListener("click", () => {
    gsap.to(questionContainer, {
        opacity: 0, y: -20, duration: 0.5, onComplete: () => {
            questionContainer.style.display = "none";
            loaderWrapper.style.display = "flex";
            gsap.fromTo(loaderWrapper, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            setTimeout(() => {
                gsap.to(loaderWrapper, {
                    opacity: 0, duration: 0.5, onComplete: () => {
                        loaderWrapper.style.display = "none";
                        startMoAnimation();
                    }
                });
            }, 2000); // Shorter wait for better UX
        }
    });
});

function showFinalResult() {
    initThreeHeart();
    heartCanvasContainer.classList.add("show");
    resultContainer.classList.add("show");
    gifResult.play();
}

window.addEventListener("resize", () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

