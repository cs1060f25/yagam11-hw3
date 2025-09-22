const PREFIX = 'voca.'

export function storageKey(k: string) {
	return `${PREFIX}${k}`
}

export function setStorage<T>(key: string, value: T) {
	try {
		localStorage.setItem(storageKey(key), JSON.stringify(value))
	} catch (e) {
		console.error('setStorage failed', e)
	}
}

export function getStorage<T>(key: string, fallback?: T): T | undefined {
	try {
		const raw = localStorage.getItem(storageKey(key))
		if (!raw) return fallback
		return JSON.parse(raw) as T
	} catch (e) {
		console.error('getStorage failed', e)
		return fallback
	}
}

export function clearStorage(key: string) {
	try {
		localStorage.removeItem(storageKey(key))
	} catch (e) {
		console.error('clearStorage failed', e)
	}
}

export default { setStorage, getStorage, clearStorage }
