import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
    constructor(){
        super('api/houses')
        this.router.get('', this.getAllHouses)
        
    }

    async getAllHouses(request, response, next) {
        try {
            const houses = await housesService.getAllHouses()
            response.send(houses)
        } catch (error) {
            next(error)
        }
    }
}