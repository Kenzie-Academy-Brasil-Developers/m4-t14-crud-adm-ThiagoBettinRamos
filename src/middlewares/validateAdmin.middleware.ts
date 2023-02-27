import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const validateAdmin = async ( request: Request, response: Response, next: NextFunction) : Promise<Response | void> => {
  const permission = request.user.admin

  if (!permission) {
    throw new AppError("Insufficient Permission", 403)
  }

  return next()
}

export default validateAdmin