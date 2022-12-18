import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {AppUserTb, AppUserTbRelations, UserDocumentTb} from '../models';
import {UserDocumentTbRepository} from './user-document-tb.repository';

export class AppUserTbRepository extends DefaultCrudRepository<
  AppUserTb,
  typeof AppUserTb.prototype.id,
  AppUserTbRelations
> {

  public readonly userDocumentTb: HasOneRepositoryFactory<UserDocumentTb, typeof AppUserTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('UserDocumentTbRepository') protected userDocumentTbRepositoryGetter: Getter<UserDocumentTbRepository>,
  ) {
    super(AppUserTb, dataSource);
    this.userDocumentTb = this.createHasOneRepositoryFactoryFor('userDocumentTb', userDocumentTbRepositoryGetter);
    this.registerInclusionResolver('userDocumentTb', this.userDocumentTb.inclusionResolver);
  }
}
