import { NextFunction, Request, Response } from "express";

import AuthConfig from "../../../Contexts/Shared/infrastructure/AuthConfig";
import { Middleware } from "./Middleware";

import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export class AuthMiddleware implements Middleware {
  constructor(private config: AuthConfig) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    if(!req.headers.authorization) {
      res.status(httpStatus.UNAUTHORIZED).send("Authorization missing");
    } else {
      const token = (req.headers.authorization as string).split('Bearer ')[1] || null;


      const verification = (jwt.verify(token as string, this.config.secretKey)) as { email: string, exp: number, iat: number };

      const expirationDate = new Date(verification.exp * 1000);
      if (new Date() > expirationDate) {
        res.status(httpStatus.UNAUTHORIZED).send("The access token has expired");
      } else {
        next();
      }
    }
  }
}
