import { Request } from "express";

export interface CreateRequest<T> extends Request { body: T };