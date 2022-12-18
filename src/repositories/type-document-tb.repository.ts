import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {TypeDocumentTb, TypeDocumentTbRelations} from '../models';

export class TypeDocumentTbRepository extends DefaultCrudRepository<
  TypeDocumentTb,
  typeof TypeDocumentTb.prototype.id,
  TypeDocumentTbRelations
> {
  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource,
  ) {
    super(TypeDocumentTb, dataSource);
  }
}
