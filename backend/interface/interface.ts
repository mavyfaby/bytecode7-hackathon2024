import { EmploymentType, LevelExpertise } from "../utils/enum"


export default interface User{
    id : Number
    first_name : String
    middle_name? : String
    last_name : String
    email: String
    password : String
    birthdate: String
    fields: String[]
    years_experience: Number
    datetime_created?: Date
  }

  export default interface Job_Listing{
    id : Number
    job_title: String
    address: String
    employment_type? : EmploymentType
    level_expertise? : LevelExpertise
    job_desc: String
    job_quali : String[]
    job_responsb : String[]
    benefits : String[]
    salary : Number
    datetime_created? : Date
  }
