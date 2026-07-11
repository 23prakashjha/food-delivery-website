const API_BASE = "https://food-delivery-website-2-qpp0.onrender.com";

export function getFoodImageUrl(image) {
  if (!image) return null;
  // Already a full URL (Cloudinary, http, data URI)
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  // Legacy local filename — fall back to backend uploads
  return `${API_BASE}/uploads/${image}`;
}
