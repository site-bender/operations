import { NumericConstant } from "../../../types"

const isNumericConstant = (c: any): c is NumericConstant =>
	"_tag" in c && c._tag === "constant" && typeof c.value === "number"

export default isNumericConstant
