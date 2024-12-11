export const getImageUrl = (img) => {
      if (img && img.startsWith('https')) {
            return img;
      } else if (img) {
            return `${import.meta.env.VITE_IMAGE_API_URL}/${img}`;
      }
      return null;
};
