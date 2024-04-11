import { Elysia } from "elysia";
import { applicants } from "../api/applicant";
import { job_listings } from "../api/job_listings";


const app = new Elysia()

app.use(applicants)
app.use(job_listings)

app.listen(process.env.API_PORT || 3000, () =>{
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})