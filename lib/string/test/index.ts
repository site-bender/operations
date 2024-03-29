type TestF = (r: RegExp) => (str: string) => boolean
const test: TestF = r => str => r.test(str)

export default test
