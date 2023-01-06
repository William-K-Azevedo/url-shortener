import prisma from "../../prisma/client";

class UrlService {
  async findOneUrl(urlId: string) {
    try {
      const url = await prisma.url.findFirst({
        where: {
          urlId,
        },
      });
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  async addUrl(origUrl: string, shortUrl: string, urlId: string, date: Date) {
    try {
      const newUrl = await prisma.url.create({
        data: {
          origUrl,
          shortUrl,
          urlId,
          date,
        },
      });
      return newUrl;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUrlClicks(urlId: string) {
    try {
      await prisma.url.update({
        where: {
          urlId,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UrlService();
