import { secrets } from "../secrets";

export const testFid: string | undefined = secrets.NODE_ENV === "development" ? "854428" : undefined
// export const testFid :string| undefined= "854428"