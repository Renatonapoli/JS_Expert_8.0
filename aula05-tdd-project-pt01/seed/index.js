const faker = require('faker')
const Car = require('./src/entities/car')
const CarCategory = require('./src/entities/carCategory')
const Custommer = require('./src/entities/custommer')

const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederBaseFolder = join(__dirname,  '../', 'database')
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const custommers = []
for (let index =0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const custommer = new Custommer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 })
  })

  custommers.push(custommer)
}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('custummers.json', custommers)
  await write('carCategories.json', [carCategory])

  console.log('cars', cars)
  console.log('custommers', custommers)
  console.log('carCategory', carCategory)
})()