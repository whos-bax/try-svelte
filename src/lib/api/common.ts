export function getCookieValue(key: string): string | null {
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === key) {
			return decodeURIComponent(value);
		}
	}
	return null;
}
