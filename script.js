
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let visibleItems = [];
let currentIndex = 0;

function updateVisibleItems() {
    visibleItems = [];
    galleryItems.forEach(function(item) {
        if (!item.classList.contains('hide')) {
            visibleItems.push(item);
        }
    });
}

updateVisibleItems();

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
     
        filterBtns.forEach(function(b) {
            b.classList.remove('active');
        });
       
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');

        galleryItems.forEach(function(item) {
            const itemCategory = item.getAttribute('data-category');
            if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });

    
        updateVisibleItems();
    });
});

galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
   
        currentIndex = visibleItems.indexOf(item);
        
        if (currentIndex !== -1) {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        }
    });
});

closeBtn.addEventListener('click', function() {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

function showImageAtIndex(index) {
    if (visibleItems.length === 0) return;
    if (index < 0) {
        currentIndex = visibleItems.length - 1;
    } else if (index >= visibleItems.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const newSrc = visibleItems[currentIndex].querySelector('img').src;
    lightboxImg.src = newSrc;
}

prevBtn.addEventListener('click', function() {
    showImageAtIndex(currentIndex - 1);
});

nextBtn.addEventListener('click', function() {
    showImageAtIndex(currentIndex + 1);
});