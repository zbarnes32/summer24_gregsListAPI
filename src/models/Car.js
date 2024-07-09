import { Schema } from "mongoose";


export const CarSchema = new Schema({
  mileage: { type: Number, min: 0, max: 1000000, required: true, default: 100 },
  engineType: { type: String, required: true, enum: ['V6', 'V8', 'V10', '4-cylinder', 'unknown'], default: 'unknown' },
  color: { type: String, maxLength: 50, required: true, default: 'red' },
  make: { type: String, minLength: 3, maxLength: 25, required: true, default: 'lightning' },
  model: { type: String, minLength: 1, maxLength: 100, required: true, default: 'McQueen' },
  price: { type: Number, min: 0, max: 999999999, required: true, default: 120000000 },
  year: { type: Number, min: 1886, max: 2025, required: true, default: 2006 },
  imgUrl: { type: String, minLength: 0, maxLength: 500, required: true, default: 'https://static.wikia.nocookie.net/disney/images/1/10/Profile_-_Lightning_McQueen.png' },
  description: { type: String, minLength: 0, maxLength: 500, default: 'A famous race car who learns there is more to life than just racing and winning following a brief but life-changing stay in the remote town of Radiator Springs' },
  hasCleanTitle: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' } // ObjectId/ref mean this property point to another collection's _id
}, { toJSON: { virtuals: true } }) // you do need the virtuals option turned on


// SIMPLE VIRTUAL GETTER, this has a get, and happens automatically
CarSchema.virtual('display').get((val, virt, car) => {
  return `a ${car.color} ${car.make} ${car.model}`
})

// NOTE virtuals created this way must be POPULATED, on retrieval
CarSchema.virtual('creator', {
  localField: 'creatorId', // what on this schema connects to the other collection
  ref: 'Account', // what is the other collection
  foreignField: '_id', // what on the other collection, matches with the localField
  justOne: true,
})


/*{
    "mileage": 16468,
    "tags": [
      "muscle",
      "modern",
      "hybrid",
      "fast"
    ],
    "engineType": "V6",
    "color": "red",
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnsjHubtTpH6sp2ut0BT-e2pc20qpDoZLSq7n-nVryUw&s",
    "price": 25000,
    "description": "A reliable and fuel-efficient sedan.",
    "creatorId": {
      "$oid": "6615af319c56355e7f8873fb"
    },
    "createdAt": "2022-09-01T10:00:00Z",
    "updatedAt": "2022-09-01T10:00:00Z",
    "_id": {
      "$oid": "66142fc611bcfca9292deb57"
    },
    "hasCleanTitle": true
  },
  */
