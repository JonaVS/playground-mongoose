import { Response, Router } from "express";
import { CreateRequest } from "./types/Request/genericRequests.js";
import { CreateTagDTO } from "../dtos/tag/tagDtos.js";
import * as tagController from "../controllers/tagController.js"

const tagRouter = Router();

tagRouter.post(
  "/",
  async (req: CreateRequest<CreateTagDTO>, res: Response) => {
    const result = await tagController.createTag(req.body);

    if (!result.success) {
      res.status(result.errorCode!).json({ error: result.error });
    } else {
      res.status(200).json(result.data);
    }
  }
);

export default tagRouter;
