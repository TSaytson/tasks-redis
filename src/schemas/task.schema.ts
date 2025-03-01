import * as yup from 'yup'

export const taskSchema = yup.object({
  title: yup.string().trim().required(),
  done: yup.boolean().required()
})

export type Task = yup.InferType<typeof taskSchema>