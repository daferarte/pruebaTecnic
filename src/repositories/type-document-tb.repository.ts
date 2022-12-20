import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {TypeDocumentTb, TypeDocumentTbRelations, UserDocumentTb} from '../models';
import {UserDocumentTbRepository} from './user-document-tb.repository';

export class TypeDocumentTbRepository extends DefaultCrudRepository<
  TypeDocumentTb,
  typeof TypeDocumentTb.prototype.id,
  TypeDocumentTbRelations
> {

  public readonly userDocumentTbs: HasManyRepositoryFactory<UserDocumentTb, typeof TypeDocumentTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('UserDocumentTbRepository') protected userDocumentTbRepositoryGetter: Getter<UserDocumentTbRepository>,
  ) {
    super(TypeDocumentTb, dataSource);
    this.userDocumentTbs = this.createHasManyRepositoryFactoryFor('userDocumentTbs', userDocumentTbRepositoryGetter,);
    this.registerInclusionResolver('userDocumentTbs', this.userDocumentTbs.inclusionResolver);
  }
}
