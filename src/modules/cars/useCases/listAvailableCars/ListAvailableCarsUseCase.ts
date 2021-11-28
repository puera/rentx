import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ category_id, name, brand }: IRequest) {
    const cars = this.carsRepository.findAllCarsAvailable(
      brand,
      category_id,
      name
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
