import { Request } from "express";
import { ParamsDictionary} from 'express-serve-static-core';

export type BaseParam = {
  id: string;
};

export interface CreateRequest<T> extends Request { body: T };

export interface ParamsRequest<T extends ParamsDictionary> extends Request {
  params: T;
}
  
export interface RequestById extends ParamsRequest<BaseParam> {}

export interface UpdateRequest<T> extends RequestById {
  body: T
}