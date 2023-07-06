export type Users = {
    id?:number,
    username?: string,
    password?: string,
    email?: string,
}
export type RegisterForm ={
    username:string,
    password:string,
    email:string,
}

export type ArticleForm ={
    article_id:string,
    title:string,
    ref_site:string,
    editor?:string,
    content:string,
}

export type JwtPayload ={
    username:string,
    password:string,
}

export type ChangePasswordForm ={
    username:string,
    password?:string,
    email?:string,
}

export type ApproveForm ={
    article_id:string,
    title:string,
    ref_site:string,
    editor?:string,
    content:string,
    version:string,
}

export interface User{
    id:number
    username:string
    password?:string
    editor_id?:number | string
}


declare global{
    namespace Express{
        interface Request{
            user?: User
        }
    }
}



interface SendData {
    Location: string  // URL of the uploaded object.
    ETag: string      // ETag of the uploaded object.
    Bucket: string    // Bucket to which the object was uploaded.
    Key: string       // Key to which the object was uploaded.
  }