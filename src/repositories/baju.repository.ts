import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BajuDataSource} from '../datasources';
import {Baju, BajuRelations} from '../models';

export class BajuRepository extends DefaultCrudRepository<
  Baju,
  typeof Baju.prototype.id,
  BajuRelations
> {
  constructor(
    @inject('datasources.baju') dataSource: BajuDataSource,
  ) {
    super(Baju, dataSource);
  }
}
