
import mongoose from "mongoose";
import { Document ,Schema } from "mongoose";

export interface IUrl extends Document{

    OriginalUrl: string,
    ShortUrl:string,
    Clicks: number ,
    createdAt: Date,
    UpdateAt: Date,
}

const UrlSchema = new Schema<IUrl>({
    OriginalUrl: {type:String , required:true},
    ShortUrl :{ type:String , required:true ,unique:true ,index:true},
    Clicks:{
        type:Number , default:0
    }

},{timestamps:true})

UrlSchema.index({createdAt: -1});
//UrlSchema.index({shortUrl: 1});

export const Url = mongoose.model<IUrl>("Url", UrlSchema);

