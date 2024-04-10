import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import User from "../interface/interface";


const prisma = new PrismaClient({
  log: ['info', 'warn', 'error']
})

const app = new Elysia().decorate('db', prisma)

//aplicant side

//get all applicants
app.get('/applicant', ({db})=>{
  return db.user.findMany();
})

//get applicants by ID
app.get('/applicant/:id',({db,params})=>{
  return db.user.findUnique({where: {id: Number(params.id)}})
})

//post register applicants

app.post('/applicant/register', ({db, body}: {db: any, body: any})=>{
  return db.user.create({
    data: body as User
  })  
})

//put register applicants

app.put('applicant/:id', ({db, body, params}: {db: any, body: any, params: any}): Promise<User> => {
   const userId=Number(params.id);
   return db.user.update({
     where:{id: Number(params.id)},
     data:body as User

})
})

app.delete('applicant/:id', ({db,params})=>{
  return db.user.delete({
    where:{id: Number(params.id)}
  })
})

app.listen(process.env.API_PORT || 3000, () =>{
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})