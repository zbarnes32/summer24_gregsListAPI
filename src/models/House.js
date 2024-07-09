import { Schema } from "mongoose";



export const HouseSchema = new Schema({
    bedrooms: { type: Number, min: 0, max: 30, required: true },
    bathrooms: { type: Number, min: 0, max: 25, required: true},
    levels: {type: Number, min: 1, max: 4, required: true},
    price: { type: Number, min: 0, max: 100000000, required: true},
    imgUrl: { type: String, maxLength: 500, required: true},
    description: { type: String, maxLength: 500, required: true},
    year: { type: Number, min: 1000, max: 2024, required: true},

})


// _id
// 66142e575a9ff35831420be4
// bedrooms
// 3
// bathrooms
// 2
// levels
// 2
// imgUrl
// "https://pixabay.com/get/g0cf1d5644db47195415612e20615555ba9db3cabcc57d…"
// year
// 1990
// price
// 5000
// description
// "Colonial revival gem with a sunroom and formal dining room."
// creatorId
// 6615af31b7376d33f96399af
// createdAt
// "2024-04-02T22:45:16.878Z"
// updatedAt
// "2024-04-02T22:45:16.878Z"