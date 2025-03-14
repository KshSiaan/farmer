export default function setImg() {
  const images = [
    "images.jpg",
    "images (1).jpg",
    "images (2).jpg",
    "images (3).jpg",
    "images (4).jpg",
    "images (5).jpg",
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return `url('${images[randomIndex]}')`; // Corrected line
}
