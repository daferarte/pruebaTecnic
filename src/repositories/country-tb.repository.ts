import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {CountryTb, CountryTbRelations} from '../models';

export class CountryTbRepository extends DefaultCrudRepository<
  CountryTb,
  typeof CountryTb.prototype.id,
  CountryTbRelations
> {
  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource,
  ) {
    super(CountryTb, dataSource);
  }
}
