export default function validateUser(body: any){
    const requiredFields = ['first_name', 'last_name', 'email', 'password', 'birthdate', 'years_experience'];
    const errors: String[] = []


    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

  if (body.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
    errors.push('Invalid email format');
  }


  return errors
}