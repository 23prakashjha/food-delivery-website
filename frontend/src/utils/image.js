import { API_ROOT } from "./api";

export function getFoodImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `${API_ROOT}/uploads/${image}`;
}
