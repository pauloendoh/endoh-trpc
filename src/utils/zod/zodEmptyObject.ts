import { z } from "zod"

// make a generic function that receives a zod object schema
// and returns all schema with most empty values possible
export function zodEmptyObject<T extends z.ZodRawShape>(
  schema: z.ZodObject<T, any, any>
) {
  const x = {} as z.infer<typeof schema>

  for (const key in schema.shape) {
    // if key is optional return undefined
    if (schema.shape[key].isOptional()) {
      x[key] = undefined as any
    }
    // if key is nullable return null
    if (schema.shape[key].isNullable()) {
      x[key] = null as any
    }
    // if string return empty string
    if (schema.shape[key] instanceof z.ZodString) {
      x[key] = "" as any
    }
    // if number return 0
    if (schema.shape[key] instanceof z.ZodNumber) {
      x[key] = 0 as any
    }
    // if boolean return false
    if (schema.shape[key] instanceof z.ZodBoolean) {
      x[key] = false as any
    }
    // if array return empty array
    if (schema.shape[key] instanceof z.ZodArray) {
      x[key] = [] as any
    }
    // if object return empty object
    if (schema.shape[key] instanceof z.ZodObject) {
      x[key] = {} as any
    }

    // if tuple return empty tuple
    if (schema.shape[key] instanceof z.ZodTuple) {
      x[key] = [] as any
    }

    // // if enum return first value
    // if (schema.shape[key] instanceof z.ZodEnum) {
    //   x[key] = schema.shape[key]. as any
    // }

    // if date return new Date()
    if (schema.shape[key] instanceof z.ZodDate) {
      x[key] = new Date() as any
    }
  }

  return x
}
