import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUserId(id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
