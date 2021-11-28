import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categoriesRepository: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categoriesRepository.find(
      (category) => category.name === name
    );

    return category;
  }
  async list(): Promise<Category[]> {
    const categories = this.categoriesRepository;

    return categories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categoriesRepository.push(category);
  }
}

export { CategoriesRepositoryInMemory };
