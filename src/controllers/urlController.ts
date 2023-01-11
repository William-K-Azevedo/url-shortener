import { Request, Response } from "express";
import { nanoid } from "nanoid";
import UrlService from "../services/urlService";
import { isValidURL } from "../utils/urlValidation";

class UrlShortener {
  async addNewShortUrl(req: Request, res: Response) {
    const { origUrl } = req.body;
    const base = process.env.BASE;
    const urlId = nanoid();

    if (isValidURL(origUrl)) {
      try {
        let url = await UrlService.findOneUrlByOrigUrl(origUrl);

        if (url) {
          return res.json(url.shortUrl);
        } else {
          const shortUrl = `${base}/api/${urlId}`;
          const date = new Date();

          url = await UrlService.addUrl(origUrl, shortUrl, urlId, date);

          return res.json(url?.shortUrl);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
    } else {
      return res.status(400).send("Invalid url provided");
    }
  }

  async redirectToUrl(req: Request, res: Response) {
    try {
      const { urlId } = req.params;
      const url = await UrlService.findOneUrlByUrlId(urlId);

      if (url) {
        await UrlService.updateUrlClicks(urlId);

        return res.redirect(url.origUrl);
      } else {
        console.log(urlId);

        return res.status(400).send("Url not found");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}

export default new UrlShortener();
