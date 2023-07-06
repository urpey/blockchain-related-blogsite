import { knex } from './knex';
import { hashPassword, isPasswordMatch } from './hash';
import { RegisterForm } from './type';
import fs from 'fs';
export type UserData = {
  id: number
  username: string
  editors_id?:number
}


export class UsersService {
  async getEditors() {
    const result = await knex.select('username').from('editors')
     if (result.length === 0) {
      return;
    }
    return result
  }

  async Login(username: string, password: string): Promise<Array<UserData> | void> {
    try {
      const pw = await knex.select('password_hash').from('users').where('username', username);

      if (pw.length < 1) {
        return [];
      }
      const password_hash: string = pw[0].password_hash;
      const result = await isPasswordMatch({ password, password_hash });
      if (!result) {
        return [];
      } else {
        const res: Array<UserData> = await knex.select('users.id as id', 'users.username',"editors.id as editors_id")
        .from('users')
        .leftJoin('editors','users.id', 'editors.users_id')
        .where('users.username', username);
        return res;
        
      }
    } catch (err) { console.log(err); }
  }

  async Register(registerForm: RegisterForm): Promise<Array<UserData> | void> {
    const hashPW = await hashPassword(registerForm.password);
    try {
      const result: Array<UserData> = await knex.insert({
        username: registerForm.username,
        password_hash: hashPW,
        email: registerForm.email,
      }).into('users').returning(['id', 'username']);

      return result;
    } catch (err) { console.log(err); }
  }

  async changePassword(username: string, password: string): Promise<Array<UserData> | void> {
    try {
      const pw = await knex.select('password_hash').from('users').where('username', username);

      if (pw.length < 1) {
        return [];
      }
      const password_hash: string = pw[0].password_hash;
      const result = await isPasswordMatch({ password, password_hash });
      if (!result) {
        return console.log('err, password does not match');
      } else {
        const res: Array<UserData> = await knex.select('users.id as id', 'users.username',"editors.id as editors_id")
        .from('users')
        .leftJoin('editors','users.id', 'editors.users_id')
        .where('users.username', username);
        return res;
        
      }
    } catch (err) { console.log(err); }
  };

  uploadIcon = async (id:string,filename:string)=>{
    console.log('filename',filename)
   let iconName =  await knex.select('icon').from('users').where('id',id).returning('icon');
   console.log(iconName);
   
   if (iconName[0].icon !== null) {
    let path = `./uploads/${iconName[0].icon}`
    fs.unlink(path, (err) => {
      if (err) throw err})
   }
   let result = await knex('users').where('id',id).update('icon',filename)
    return result
  };

getDetail = async (id:number) =>{
  let result = await knex.select('icon','detail').from('users').where('id', id);
  return result[0]
};

getUser = async (id:string | number)=>{
  let result = await knex.select('id','username').from('users').where('id', id);
  return result[0]
};

getEditor = async (id:string | number) => {
  let result = await knex.select("id").from('editors').where('users_id', id); //'editor_id'
  if (result.length === 0) {
    return;
  }
  console.log("EDITORRRR", result)
  return result[0]
};

uploadDetail= async (form:{id:number,detail:any}) =>{
  let result = await knex('users').where('id',form.id).update('detail',form.detail)
  console.log('resultdetail',result);
  
    return result
}
}


