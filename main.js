document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('hidden');
        });
    }

    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            if (nav) nav.classList.toggle('hidden');
        });
    }
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('.page-section');
    function showSection(id) {
        sections.forEach(sec => {
            sec.style.display = (sec.id === id) ? 'block' : 'none';
        });
    }
    showSection('home'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').replace('#', '');
            showSection(id);
            if (menuToggle && nav) nav.classList.add('hidden');
        });
    });
});

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const noticeSection = document.getElementById('notice-section');
    const dotsBg = document.getElementById('dots-bg');

    // キラキラ生成
    let sparkles = [];
    if (dotsBg) {
        const colors = ['#fffacd', '#ffe066', '#b2dfdb', '#8df1e9', '#f9b5c4', '#03abee'];
        for (let i = 0; i < 18; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-anim';
            sparkle.innerHTML = `
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <polygon points="16,2 18,12 30,16 18,20 16,30 14,20 2,16 14,12"
                        fill="${colors[Math.floor(Math.random()*colors.length)]}" opacity="0.8"/>
                </svg>
            `;
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${Math.random()*95}vw`;
            sparkle.style.top = `${Math.random()*90}vh`;
            sparkle.style.opacity = '0';
            dotsBg.appendChild(sparkle);
            sparkles.push(sparkle);
        }
    }


    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';

            
            sparkles.forEach((sparkle, idx) => {
                setTimeout(() => {
                    sparkle.style.opacity = '1';
                    sparkle.classList.add('sparkle-fade-loop');
                }, idx * 80);
            });

            
            setTimeout(() => {
                if (noticeSection) noticeSection.style.display = 'flex';
            }, 1800);
        }, 2000);
    }

    const noticeClose = document.getElementById('notice-close');
    if (noticeClose && noticeSection) {
        noticeClose.addEventListener('click', () => {
            noticeSection.style.display = 'none';
        });
    }
});

let star = null;
let rotate =10;
let fadeTimeout = null;
let rotateInterval = null;

document.addEventListener('mousemove', function(e) {
    if (!star) {
        star = document.createElement('div');
        star.className = 'star';
        
        star.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M44 32
                        A20 20 0 1 1 32 12
                        A16 16 0 1 0 44 32
                        Z"
                        fill="#ffe066" stroke="#e6c200" stroke-width="2"/>
                </g>
            </svg>
        `;
        document.body.appendChild(star);
    }

    star.style.left = (e.clientX - 32) + 'px';
    star.style.top = (e.clientY - 32) + 'px';

    star.classList.remove('fade');
    star.style.opacity = '1';

    if (fadeTimeout) clearTimeout(fadeTimeout);

    fadeTimeout = setTimeout(() => {
        if (star) {
            star.classList.add('fade');
            setTimeout(() => {
                if (star) {
                    star.remove();
                    star = null;
                }
            }, 800);
        }
    }, 120);
});