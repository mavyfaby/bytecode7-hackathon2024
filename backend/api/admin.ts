import Elysia, { Cookie } from "elysia";
import { PrismaClient } from "@prisma/client";
import { createSessionToken } from "../utils/validation";

const prisma = new PrismaClient();

export const admin = new Elysia().decorate('req', prisma)
    .post('/admin/login', async ({ req, body }: { req: any, body: any }) => {

        const query = await req.interviewer.findUnique({
            where: { username: body.username },
        })


        return Response.json({ success: true, message: "oh yeam imnida", data: query })
    }).post("admin/logout", async ({ req }) => {

        return Response.json({ success: true, message: 'logout me daddy' })
    })
