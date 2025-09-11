import { v5 as uuidv5 } from "uuid";

// Use one of the predefined namespaces (or define your own UUID as namespace)
const MY_NAMESPACE = uuidv5.URL;

export function numberToUUID(num: number) {
    return uuidv5(num.toString(), MY_NAMESPACE);
}

// // Example
// console.log(numberToUUID(12345));
// // 👉 "f8b8fd4f-7199-520d-bb0d-1a58cbd0f4c2"

// console.log(numberToUUID(67890));
// // 👉 "c41789d5-93a1-5a57-8b34-1e59e6e9b2f1"

// // Same number always gives same UUID ✅
// console.log(numberToUUID(12345));
// // 👉 "f8b8fd4f-7199-520d-bb0d-1a58cbd0f4c2"
