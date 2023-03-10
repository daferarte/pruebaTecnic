import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {AppUserTb, AppUserTbRelations, UserDocumentTb, ContactInfoTb} from '../models';
import {UserDocumentTbRepository} from './user-document-tb.repository';
import {ContactInfoTbRepository} from './contact-info-tb.repository';

export class AppUserTbRepository extends DefaultCrudRepository<
  AppUserTb,
  typeof AppUserTb.prototype.id,
  AppUserTbRelations
> {

  public readonly userDocumentTb: HasOneRepositoryFactory<UserDocumentTb, typeof AppUserTb.prototype.id>;

  public readonly contactInfoTb: HasOneRepositoryFactory<ContactInfoTb, typeof AppUserTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('UserDocumentTbRepository') protected userDocumentTbRepositoryGetter: Getter<UserDocumentTbRepository>, @repository.getter('ContactInfoTbRepository') protected contactInfoTbRepositoryGetter: Getter<ContactInfoTbRepository>,
  ) {
    super(AppUserTb, dataSource);
    this.contactInfoTb = this.createHasOneRepositoryFactoryFor('contactInfoTb', contactInfoTbRepositoryGetter);
    this.registerInclusionResolver('contactInfoTb', this.contactInfoTb.inclusionResolver);
    this.userDocumentTb = this.createHasOneRepositoryFactoryFor('userDocumentTb', userDocumentTbRepositoryGetter);
    this.registerInclusionResolver('userDocumentTb', this.userDocumentTb.inclusionResolver);
  }
}
