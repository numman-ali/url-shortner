import { index, pre, prop } from "@typegoose/typegoose";
import { mongoose } from "@typegoose/typegoose";
import { customAlphabet } from 'nanoid/async';
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8)

export const getShortId = async (ctx) => {
  let newCode = await nanoid();
  let codeAlreadyUsed = !!await ctx.constructor.findOne({ 'shortId': newCode });
  while (codeAlreadyUsed) {
    newCode = await nanoid();
    codeAlreadyUsed = !!await ctx.constructor.findOne({ 'shortId': newCode });
  }
  return newCode;
}

@index({ 'shortId': 1 })
@pre<Url>('save', async function () {
  if (this.shortId) {
    return;
  }
  this.shortId = await getShortId(this);

})
export class Url {
  _id?: mongoose.Types.ObjectId;

  @prop({ unique: true })
  public shortId?: string;

  @prop({ required: true })
  public longUrl: string;

  @prop({ required: true })
  public userId: mongoose.Types.ObjectId;
}
