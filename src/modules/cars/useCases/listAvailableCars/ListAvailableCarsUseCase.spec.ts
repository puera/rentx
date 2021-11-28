import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepository: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all cars available", async () => {
    await carsRepository.create({
      name: "Car 1",
      description: "desc 1",
      brand: "brand 1",
      category_id: "1",
      daily_rate: 10,
      license_plate: "ABC-100",
      fine_amount: 60,
    });

    await carsRepository.create({
      name: "Car 2",
      description: "desc 2",
      brand: "brand 2",
      category_id: "1",
      daily_rate: 10,
      license_plate: "ABC-101",
      fine_amount: 60,
    });

    await carsRepository.create({
      name: "Car 3",
      description: "desc 3",
      brand: "brand 3",
      category_id: "2",
      daily_rate: 10,
      license_plate: "ABC-102",
      fine_amount: 60,
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(3);
  });

  it("should be able to list all cars available by brand", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "desc 1",
      brand: "brand test",
      category_id: "1",
      daily_rate: 10,
      license_plate: "ABC-100",
      fine_amount: 60,
    });

    const cars = await listCarsUseCase.execute({ brand: "brand test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars available by name", async () => {
    const car = await carsRepository.create({
      name: "Car 4",
      description: "desc 1",
      brand: "brand test",
      category_id: "1",
      daily_rate: 10,
      license_plate: "ABC-100",
      fine_amount: 60,
    });

    const cars = await listCarsUseCase.execute({ name: "Car 4" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars available by category id", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "desc 1",
      brand: "brand test",
      category_id: "5",
      daily_rate: 10,
      license_plate: "ABC-100",
      fine_amount: 60,
    });

    const cars = await listCarsUseCase.execute({ category_id: "5" });

    expect(cars).toEqual([car]);
  });
});
