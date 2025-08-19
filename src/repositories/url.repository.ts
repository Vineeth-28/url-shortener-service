import { Url, IUrl } from "../models/Url";

export interface CreateUrl {
  originalUrl: string;
  shortUrl: string;
}

export interface UrlStats {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UrlRepository {
  async create(data: CreateUrl): Promise<IUrl> {
    const url = new Url(data);
    return await url.save(); // ✅ fixed
  }

  async findByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await Url.findOne({ shortUrl }); // ✅ fixed case
  }

  async findAll(): Promise<UrlStats[]> {
    const urls = await Url.find()
      .select({
        _id: 1,
        originalUrl: 1,
        shortUrl: 1,
        clicks: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({ createdAt: -1 })
      .lean<IUrl[]>(); // ✅ ensures plain JS objects

    return urls.map((url) => ({
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    }));
  }

  async incrementClicks(shortUrl: string): Promise<void> {
    await Url.findOneAndUpdate(
      { shortUrl }, // ✅ fixed syntax
      { $inc: { clicks: 1 } }
    );
  }

  async findStatsByShortUrl(shortUrl: string): Promise<UrlStats | null> {
    const url = await Url.findOne({ shortUrl })
      .select({
        _id: 1,
        originalUrl: 1,
        shortUrl: 1,
        clicks: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .lean<IUrl | null>();

    if (!url) return null;

    return {
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }
}
