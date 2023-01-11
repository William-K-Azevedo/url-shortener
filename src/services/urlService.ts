import prisma from "../../prisma/client";

class UrlService {
  async findOneUrlByOrigUrl(origUrl: string) {
    try {
      return await prisma.url.findUnique({
        where: {
          origUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOneUrlByUrlId(urlId: string) {
    try {
      return await prisma.url.findUnique({
        where: {
          urlId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addUrl(origUrl: string, shortUrl: string, urlId: string, date: Date) {
    try {
      return await prisma.url.create({
        data: {
          origUrl,
          shortUrl,
          urlId,
          date,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUrlClicks(urlId: string) {
    try {
      return await prisma.url.update({
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
