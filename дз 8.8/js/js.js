document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const gallery = document.querySelector('.gallery');
    const loader = document.querySelector('.gallery_loader');

    button.addEventListener('click', async () => {
        try {
           
            loader.style.display = 'block';
            gallery.innerHTML = ''; 

            
            const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }

            const data = await response.json();

            
            const loadImage = (url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve(img); 
                    img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
                });
            };

            
            for (const imageUrl of data.message) {
                try {
                    const imgElement = await loadImage(imageUrl); 
                    gallery.appendChild(imgElement); 
                } catch (error) {
                    console.error('Ошибка при загрузке изображения:', error);
                }
            }

        } catch (error) {
            console.error('Произошла ошибка:', error);
        } finally {
            
            loader.style.display = 'none';
        }
    });
});