import { EmploymentType, Penv, Status, TypeInterview } from "../utils/enum"

export default interface User{
    id : Number
    first_name : String
    middle_name? : String
    last_name : String
    email: String
    password : String
    birthdate: String
    years_experience?: String
    datetime_created?: Date
  }

  export default interface Job_Listing{
    id : Number
    job_title: String
    address: String
    employment_type? : EmploymentType
    penv?: Penv
    job_desc: String
    job_quali : String
    job_responsb : String
    benefits : String
    salary : Number
    datetime_created? : Date
  }

  export default interface Announcements{
    id: Number
    title: String
    description: String
    date: String
    time?: String
    datetime_created? : Date

  }

  export default interface Application{
    id: Number
    status?: Status
    type_interview? :TypeInterview  
    job_applied : Number
    applicantId: Number
    intial_done_date?:  String
    final_done_date? :String
    initial_interview_datetime? : String
    final_interview_datetime?: String
    final_requirements_done_date?: String
    initial_stars?: Number
    final_message? : String
    datetime_created? : Date
  }

  export default interface Interviewer{
    id: Number
    username : String
    password : String
    rating : Number
    datetime_created? : Date
  }