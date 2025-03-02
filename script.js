document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const originalImage = document.getElementById('originalImage');
            const enhancedImage = document.getElementById('enhancedImage');
            originalImage.src = e.target.result;
            enhancedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const saturation = document.getElementById('saturation');

[brightness, contrast, saturation].forEach(slider => {
    slider.addEventListener('input', updateImage);
});

function updateImage() {
    const enhancedImage = document.getElementById('enhancedImage');
    enhancedImage.style.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturation.value}%)
    `;
}

function resetFilters() {
    brightness.value = 100;
    contrast.value = 100;
    saturation.value = 100;
    updateImage();
}

const slider = document.getElementById('slider');
slider.addEventListener('input', function() {
    const originalImage = document.getElementById('originalImage');
    const enhancedImage = document.getElementById('enhancedImage');
    const value = this.value;
    originalImage.style.width = `${value}%`;
    enhancedImage.style.width = `${100 - value}%`;
});

// Download Enhanced Image
document.getElementById('downloadButton').addEventListener('click', function() {
    const enhancedImage = document.getElementById('enhancedImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = enhancedImage.naturalWidth;
    canvas.height = enhancedImage.naturalHeight;

    // Apply filters to the canvas
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturation.value}%)
    `;

    ctx.drawImage(enhancedImage, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image and trigger download
    const link = document.createElement('a');
    link.download = 'enhanced-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
