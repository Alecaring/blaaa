const canvas = document.getElementById('paricle');
const likeBtn = document.getElementById('like');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Paricle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x          = x;
        this.y          = y;
        this.size       = size;
        this.color      = color;
        this.speedX     = speedX;
        this.speedY     = speedY;
        this.opacity    = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x          += this.speedX;
        this.y          += this.speedY;
        this.opacity    -= 0.02; // dissolveza
        
        if(this.size > 0.1) this.size -= 0.1; // riduzione per la dimensione
    }

}
// generare particelle al click
function generateParticles(x, y) {
    const colors = [
        '255, 99, 132', // rosso
        '54, 162, 235', // blu
        '255, 206, 86', // giallo
        '75, 192, 192', //verde acqua
        '153, 102, 255', // viola
    ];

    for (let i = 0; i < 15; i++) {
        const size      = Math.random() * 8 + 2;
        const color     = colors[Math.floor(Math.random() * colors.length)];
        const speedX    = Math.random() * 4 - 2; // movimento laterale
        const speedY    = Math.random() *3 - 2; // movimento verso l'alto

        particlesArray.push(new Paricle(x, y, size, color, speedX, speedY))
    };
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if(particle.opacity <= 0) {
            particlesArray.splice(index, 1); // rimuovi particelle svanite
        }
    });
    requestAnimationFrame(animate);
}

likeBtn.addEventListener('click', (event) => {
    const rect = likeBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    generateParticles(x, y);
});

animate();