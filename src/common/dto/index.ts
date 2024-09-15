import { ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';

export interface MongooseQueryDto<T> {
  filter?: RootFilterQuery<T>;
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
}
