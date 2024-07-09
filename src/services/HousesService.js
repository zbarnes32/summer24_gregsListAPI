import { dbContext } from "../db/DbContext.js"



class HousesService {
    async getAllHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }
    
   async searchHouses(searchQuery) {
        const houses = await dbContext.Houses.find(searchQuery)
        return {
            query: searchQuery,
            results: houses
        }
    }
}

export const housesService = new HousesService()