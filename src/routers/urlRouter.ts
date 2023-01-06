import { Router } from "express";
import UrlShortener from "../controllers/urlController";

export const urlRouter = Router();

urlRouter.get("/short", UrlShortener.addNewShortUrl);
urlRouter.get("/:urlId", UrlShortener.redirectToUrl);
