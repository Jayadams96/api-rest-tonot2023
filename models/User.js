import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  
  nombre:{
    type: String,
    required: true
  },
  apellido:{
    type: String,
    required: true
  },
  edad:{
    type: Number,
    min: 18,
    max: 100
  },
  email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: { unique: true }
  },
  contraseña: {
      type: String,
      required: true
  },
  creado: {
    type: Date,
    default: Date.now
  }
});

export const User = model('user', userSchema);
