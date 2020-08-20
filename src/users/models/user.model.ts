import { index, pre, prop } from "@typegoose/typegoose";
import { mongoose } from "@typegoose/typegoose";
const bcrypt = require('bcrypt');

@index({ 'email': 1 })
@pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
})
export class User {
  _id?: mongoose.Types.ObjectId;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true })
  public password: string;
}
