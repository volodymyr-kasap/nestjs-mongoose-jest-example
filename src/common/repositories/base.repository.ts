import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';


export abstract class BaseMongoRepository<T extends Document> {
  protected constructor (protected readonly entityModel: Model<T>) {}

  async findOneById (_id: string): Promise<T | null> {
    return this.entityModel.findById(_id).exec();
  }

  async findOneBy (entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery).exec();
  }

  async find (entityFilterQuery: FilterQuery<T>): Promise<T[]> {
    return this.entityModel.find(entityFilterQuery).exec();
  }

  async create (createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate (
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany (entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
