export const API_ROOT = "https://food-delivery-website-2-qpp0.onrender.com";
export const API_BASE = `${API_ROOT}/api`;

export const authHeaders = () => {
	try {
		const user = JSON.parse(localStorage.getItem("user") || "null");
		return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
	} catch {
		return {};
	}
};

export const apiFetch = async (path, options = {}) => {
	const response = await fetch(`${API_BASE}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...authHeaders(),
			...(options.headers || {}),
		},
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) throw new Error(data.message || "Request failed");
	return data;
};

export const getOrderItemPrice = (item) => Number(
	item?.unitPrice ?? item?.price ?? (item?.discountPrice > 0 ? item.discountPrice : item?.originalPrice) ?? 0
);
