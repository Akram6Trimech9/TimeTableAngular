export interface Admin {
    _id ?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean  ,
    isBlocked: boolean ,
}
export interface Login {
  email: string,
  password: string,
 }
