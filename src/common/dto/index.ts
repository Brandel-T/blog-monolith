import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export interface MongooseQueryDto<T> {
  filter?: FilterQuery<T>;
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
}
