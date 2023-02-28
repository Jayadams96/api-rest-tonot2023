import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    min: 18,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  contraseña: {
    type: String,
    required: true,
  }
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("contraseña")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.contraseña = await bcryptjs.hash(user.contraseña, salt);
    next();
  } catch (error) {
    throw new Error("Fallo el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function(clientPassword){
  return await bcryptjs.compare(clientPassword, this.contraseña)
}

export const User = model("User", userSchema);
