import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {UserDocumentTb, UserDocumentTbRelations, AppUserTb, TypeDocumentTb} from '../models';
import {AppUserTbRepository} from './app-user-tb.repository';
import {TypeDocumentTbRepository} from './type-document-tb.repository';

export class UserDocumentTbRepository extends DefaultCrudRepository<
  UserDocumentTb,
  typeof UserDocumentTb.prototype.id,
  UserDocumentTbRelations
> {

  public readonly appUserTb: BelongsToAccessor<AppUserTb, typeof UserDocumentTb.prototype.id>;

  public readonly typeDocumentTb: BelongsToAccessor<TypeDocumentTb, typeof UserDocumentTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('AppUserTbRepository') protected appUserTbRepositoryGetter: Getter<AppUserTbRepository>, @repository.getter('TypeDocumentTbRepository') protected typeDocumentTbRepositoryGetter: Getter<TypeDocumentTbRepository>,
  ) {
    super(UserDocumentTb, dataSource);
    this.typeDocumentTb = this.createBelongsToAccessorFor('typeDocumentTb', typeDocumentTbRepositoryGetter,);
    this.registerInclusionResolver('typeDocumentTb', this.typeDocumentTb.inclusionResolver);
    this.appUserTb = this.createBelongsToAccessorFor('appUserTb', appUserTbRepositoryGetter,);
    this.registerInclusionResolver('appUserTb', this.appUserTb.inclusionResolver);
  }
}
