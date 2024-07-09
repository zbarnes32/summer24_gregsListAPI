import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";



export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router.get('', this.getAllCars)
    this.router.get('/search', this.searchCars)
    this.router.get('/superSearch', this.superSearchCars)

    // very basic middleware example
    this.router.use((request, response, next) => {
      console.log('🧀⚡MiddleWare');
      request.headers.cheese = '🧀'
      next() // next kicks the request down the hall, or moves the request to the next method below
    })

    this.router.use(Auth0Provider.getAuthorizedUserInfo) // this middleware, looks at the bearer token, and pulls out the users info and attaches it to the request
    this.router.post('', this.createCar)
  }

  async createCar(request, response, next) {
    try {
      const carData = request.body
      const user = request.userInfo
      console.log('creating car', request.userInfo, carData);
      carData.creatorId = user.id
      console.log('👮', carData);
      const car = await carsService.createCar(carData)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async getAllCars(request, response, next) {
    try {
      const cars = await carsService.getAllCars()
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async searchCars(request, response, next) {
    try {
      const searchQuery = request.query
      console.log('🔮', searchQuery);
      const cars = await carsService.searchCars(searchQuery)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async superSearchCars(request, response, next) {
    try {
      const searchQuery = request.query
      const cars = await carsService.superSearchCars(searchQuery)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }
}
