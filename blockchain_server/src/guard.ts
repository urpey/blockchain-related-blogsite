import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import express from "express";
import { env } from "./env";
import { UsersService } from "./users-service";
import { log } from "console";

const GuardUsersServices = new UsersService();
export const permit = new Bearer({
    header:'authorization',
//   query: "access_token",
});

export async function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);    

    if (!token) {
        return res.status(401).json({ msg: "Permission Denied no token" });
    }
    
        let splitToken =token.startsWith('Bearer')?token.slice(6):token
    console.log(splitToken);
    
    const payload = jwtSimple.decode(splitToken, env.JWT_SECRET);

    let id: number = payload.id;
    // Querying Database is not compulsory
    const user = await GuardUsersServices.getUser(id);

    if (user) {
        console.log('requser',user);
      req.user = user;
      return next();
    }
    else {
      return res.status(401).json({ msg: "Permission Denied no user" });
    }

  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied error" });
  }
}

export async function isEditor(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {

    if (!req.user) {
      return res.status(401).json({ msg: "Permission Denied not a user" });
    }

    let id: number = req.user.id;
    console.log(id)
    // Querying Database is not compulsory
    const editorId = await GuardUsersServices.getEditor(id);

    if (editorId) {
      req.user.editor_id = editorId.id;
      return next();
    } 
    else {
      return res.status(401).json({ msg: "Permission Denied not a editor" });
    }
  } 
  catch (e) {
    return res.status(401).json({ msg: "Permission Denied error Editor" });
  }
}
