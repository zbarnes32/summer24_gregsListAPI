import { dbContext } from "../db/DbContext.js"


class CarsService {
  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    await car.populate('creator', '-email') // populate must be on a new line for creates
    return car
  }

  async getAllCars() {
    // const cars = await dbContext.Cars.find().populate('creator', ['name', 'picture'])
    // const cars = await dbContext.Cars.find().populate('creator', 'name picture')
    const cars = await dbContext.Cars.find().populate('creator', '-email') // this populate corresponds with the virtual in the Car model
    return cars
  }

  async searchCars(searchQuery) {
    // const cars = await dbContext.Cars.find({ model: 'Civic', color: 'white' })
    // const cars = await dbContext.Cars.find(searchQuery)

    const pageNumber = searchQuery.page ? searchQuery.page - 1 : 0
    delete searchQuery.page

    const limitNumber = searchQuery.limit ? searchQuery.limit : 5
    delete searchQuery.limit

    const searchDescription = searchQuery.description ? { $regex: new RegExp(searchQuery.description, 'ig') } : null
    if (searchDescription) searchQuery.description = searchDescription

    const cars = await dbContext.Cars.find(searchQuery).limit(limitNumber).skip(pageNumber * limitNumber)
    const resultCount = await dbContext.Cars.countDocuments(searchQuery)
    return {
      limit: limitNumber,
      page: pageNumber + 1,
      query: searchQuery,
      count: resultCount,
      included: cars.length > 0 ? `${pageNumber * limitNumber + 1} - ${(pageNumber * limitNumber) + cars.length}` : 0,
      results: cars
    }
  }

  async superSearchCars(searchQuery) {
    console.log('🔮', searchQuery);
    if (searchQuery.year.includes('>') || searchQuery.year.includes('<')) {
      const searchYear = searchQuery.year.slice(1)
      console.log('fancy year');
      const fancyYear = searchQuery.year[0] == '>' ? { $gte: searchYear } : { $lte: searchYear }
      searchQuery.year = fancyYear
    }
    console.log('🧙‍♂️', searchQuery);
    // const cars = await dbContext.Cars.find(searchQuery)
    const cars = await this.searchCars(searchQuery)
    // return {
    //   query: searchQuery,
    //   included: cars.length,
    //   result: cars
    // }
    return cars
  }

}

export const carsService = new CarsService()
