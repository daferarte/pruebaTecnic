import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {UserDocumentTb, UserDocumentTbRelations, AppUserTb} from '../models';
import {AppUserTbRepository} from './app-user-tb.repository';

export class UserDocumentTbRepository extends DefaultCrudRepository<
  UserDocumentTb,
  typeof UserDocumentTb.prototype.id,
  UserDocumentTbRelations
> {

  public readonly appUserTb: BelongsToAccessor<AppUserTb, typeof UserDocumentTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('AppUserTbRepository') protected appUserTbRepositoryGetter: Getter<AppUserTbRepository>,
  ) {
    super(UserDocumentTb, dataSource);
    this.appUserTb = this.createBelongsToAccessorFor('appUserTb', appUserTbRepositoryGetter,);
    this.registerInclusionResolver('appUserTb', this.appUserTb.inclusionResolver);
  }
}
