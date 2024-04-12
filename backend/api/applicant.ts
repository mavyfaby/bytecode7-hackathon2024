import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import User from "../interface/interface";
import validateUser from "../utils/validation";

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error']
})

export const applicants = new Elysia().decorate('req', prisma)
//all
  .get('/applicants', async ({ req }) => {

    const query = await req.user.findMany()
    const output = query !== null ? Response.json({ success: true, message: 'Successfully Retrieved Applicants', data: query }) :
      Response.json({ success: false, message: 'No Applicants as of now', data: [] })

    return output
    //id
  })
  .get('/applicant/:id', async ({ req, params }) => {

    const query = await req.user.findUnique({ where: { id: Number(params.id) } })
    const output = query !== null ? Response.json({ success: true, message: `Successfully retrieved ${query?.first_name}`, data: query }) :
      Response.json({ success: false, message: 'Applicant not found.', data: [] })

    return output
  })

  .post('/applicant/register', async ({ req, body }: { req: any, body: any }) => {

    validateUser(body)
    const hashedPassword = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 10
    })

    body.password = hashedPassword
    const test = await req.user.create({
      data: body as User
    })

    return Response.json({ success: true, message: "User registered successfully!", data: test })

  })
  .put('/applicant/update/:id', async ({ req, body, params }: { req: any, body: any, params: any }) => {
    await req.user.update({
      where: { id: Number(params.id) },
      data: body as User
    })

    return Response.json({ success: true, message: "User updated successfully!" })
  })
  .delete('applicant/delete/:id', async ({ req, params }: { req: any, params: any }) => {
    await req.user.delete({
      where: { id: Number(params.id) }
    })

    return Response.json({ success: true, message: "User Deleted successfully!" })
  })

