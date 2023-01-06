import { Router } from "express";
import UrlShortener from "../controllers/urlController";

export const urlRouter = Router();

urlRouter.post("/short", UrlShortener.addNewShortUrl);
urlRouter.get("/:urlId", UrlShortener.redirectToUrl);
