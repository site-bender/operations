import { composeOperators } from "./dist/operations.js"

export const data1 = {
	addends: [21, 4, 66],
	operator: "add",
	returns: "number",
}

export const data2 = {
	addends: [2, data1, 5],
	operator: "add",
	returns: "number",
}

export const data3 = {
	minuend: 91,
	operator: "subtract",
	returns: "number",
	subtrahend: 30,
}

export const data4 = {
	minuend: data1,
	operator: "subtract",
	returns: "number",
	subtrahend: data2,
}

export const data5 = {
	minuend: data4,
	operator: "subtract",
	returns: "number",
	subtrahend: 7,
}

export const data6 = {
	dividend: data4,
	operator: "divide",
	returns: "number",
	divisor: 7,
}

export const data7 = {
	multipliers: [data4, 7, 3],
	operator: "multiply",
	returns: "number",
}

export const data8 = {
	minuend: data7,
	operator: "subtract",
	returns: "number",
	subtrahend: 77,
}

globalThis.addEventListener("DOMContentLoaded", () => {
	const data = data8
	const result = composeOperators(data)

	const pre = document.querySelector("pre")
	const output = document.querySelector("output")

	if (pre) {
		pre.innerHTML = JSON.stringify(data, null, 2)
	}

	if (output) {
		output.innerHTML = `Result: <strong>${result.toString()}</strong>`
	}
})
