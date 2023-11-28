import { MenuLogin } from "./MenuLogin";

export default interface UserLogin{
    token:string,
    username:string,
    userId:number,
    name:string,
    lastname1:string,
    lastname2:string,
    email:string,
    menus: MenuLogin[]
}