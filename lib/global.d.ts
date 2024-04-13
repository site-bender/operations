declare module globalThis {
	var cookieStore: (n: string) => {
		name: string
		value: string
	}
}
