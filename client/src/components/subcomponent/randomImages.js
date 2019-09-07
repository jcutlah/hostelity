import Images from "../../randomImages.json";

console.log(Images);
const randomImage = `/assets/images/${Images[Math.floor(Math.random() * Images.length)]}`;

export default randomImage;