import { ObjectId } from "mongodb";
import { object, string } from "yup";

export const mongoIdParamsSchema = object({
  id: string().test((id) => ObjectId.isValid(id!))
})