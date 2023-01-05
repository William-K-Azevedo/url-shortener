import { Request, Response } from "express";

class UrlShortener {
  async addNewShortUrl(req: Request, res: Response) {
    return res.json({
      estado: "tudo certo",
    });
  }
}

export default new UrlShortener();
