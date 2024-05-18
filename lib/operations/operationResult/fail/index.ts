import { left } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"

type Fail = (error: string) => OperationResult<never>

const fail: Fail = error => left([error])

export default fail
