const imageWrapper = document.querySelector('.image-scroller');
const images = document.querySelectorAll('.image-scroller span');
let scrollAmount = 0;
const imageWidth = images[0].offsetWidth;
const totalImages = images.length;
let currentIndex = Math.floor(totalImages / 2);

function updateCenterImage() {
    images.forEach((span) => {
        span.classList.remove('center-image');
    });
    images[currentIndex].classList.add('center-image');
}

function scrollImages() {
    scrollAmount -= imageWidth;
    imageWrapper.style.transition = 'transform 1s ease';
    imageWrapper.style.transform = `translateX(${scrollAmount}px)`;

    currentIndex = (currentIndex + 1) % totalImages;
    updateCenterImage();

    setTimeout(() => { //appending new image and scrolling image simultaneously caused lag so used timeout function to seperate them
        imageWrapper.style.transition = 'none';

        const firstImage = imageWrapper.firstElementChild;
        imageWrapper.appendChild(firstImage);
        scrollAmount += imageWidth;
        imageWrapper.style.transform = `translateX(${scrollAmount}px)`;
    }, 1500); 
}


updateCenterImage();


setInterval(scrollImages, 5000);
