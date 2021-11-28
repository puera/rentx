import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  usersRepository: User[] = [];
  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });

    this.usersRepository.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.usersRepository.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
