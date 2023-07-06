import { Request, Response } from "express";
import { UserData, UsersService } from "./users-service";
import { ChangePasswordForm, RegisterForm } from "./type";
import { env } from "./env";
import jwtSimple from "jwt-simple";
import { extractFile, extractSingleFile, form, ReturnFieldString } from "./upload";

export class UsersController {
  constructor(private usersService: UsersService) {}

  getEditors = async (req: Request, res: Response) => {
    const result = await this.usersService.getEditors()
    res.json({result})
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username) {
        res.status(400).json({ error: "missing username" });
        return;
      }
      if (!password) {
        res.status(400).json({ error: "missing password" });
        return;
      }

      const result = await this.usersService.Login(username, password);
      if (result) {
        if (result.length < 1) {
          res.status(403).json({ error: "wrong username or password" });
          return;
        }
        const payload = {
          id: result[0].id,
          username: result[0].username,
          role: result[0].editors_id ? "editor" : "user",
        };
        const token = jwtSimple.encode(payload, env.JWT_SECRET);

        res.json({ token });
      }
      res.end();
    } catch (e) {
      console.error("failed login:", e);
    }
  };

  register = async (req: Request, res: Response) => {
    for (const body in req.body) {
      if (!body) {
        res.status(400).json({ error: `missing ${body}` });
        return;
      }
    }

    const registerForm: RegisterForm = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const result = await this.usersService.Register(registerForm);
    if (result) {
      return res.json({ msg: "register success" });
    }
    res.status(500).json({ error: "request failed" });
  };

  changePassword = async (req: Request, res: Response) => {
    for (const body in req.body) {
      if (!body) {
        res.status(400).json({ error: `missing ${body}` });
        return;
      }
    }
    const changePasswordForm: ChangePasswordForm = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
  };


  uploadIcon = async (req: Request, res: Response)=>{
    try {
      form.parse(req, async (err, fields, files) => {
        console.log(files);
        let id = ReturnFieldString(fields.id) 
        let icon = extractSingleFile(files.icon)
        let filename= icon?.newFilename
        if (!filename) {
          res.status(400).json({ error: `missing file` });
        } else {
          let result = await this.usersService.uploadIcon(id,filename);
          if (result) {       
              return res.json({ msg: "change Icon success" });
          }
        }
      })
  } catch (e) {
      console.log(e);
  }
  };

  getDetail = async (req: Request, res: Response) =>{
    if(!req.user){
      res.status(400).json({ error: `missing user` });
      return
    } 
    let id = req.user.id
    let result = await this.usersService.getDetail(id)
    if (result) {
      return res.json(result);
    }
    
  };

  uploadDetail = async (req: Request, res: Response) => {
console.log('working');

      if (!req.body) {
        res.status(400).json({ error: `missing body` });
        return;
      }
      if (!req.user) {
        res.status(400).json({ error: `missing user` });
        return;
      }
      console.log('detail',req.body);
      
let form = {
  id:req.user.id,
  detail:req.body.detail
}
  

    const result = await this.usersService.uploadDetail(form);
    if (result) {
      return res.json({ msg: "edit detail success" });
    }
    res.status(500).json({ error: "request failed" });
  };
}
