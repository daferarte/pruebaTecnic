import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BdmysqlDataSource} from '../datasources';
import {CountryTb, CountryTbRelations, ContactInfoTb} from '../models';
import {ContactInfoTbRepository} from './contact-info-tb.repository';

export class CountryTbRepository extends DefaultCrudRepository<
  CountryTb,
  typeof CountryTb.prototype.id,
  CountryTbRelations
> {

  public readonly contactInfoTbs: HasManyRepositoryFactory<ContactInfoTb, typeof CountryTb.prototype.id>;

  constructor(
    @inject('datasources.bdmysql') dataSource: BdmysqlDataSource, @repository.getter('ContactInfoTbRepository') protected contactInfoTbRepositoryGetter: Getter<ContactInfoTbRepository>,
  ) {
    super(CountryTb, dataSource);
    this.contactInfoTbs = this.createHasManyRepositoryFactoryFor('contactInfoTbs', contactInfoTbRepositoryGetter,);
    this.registerInclusionResolver('contactInfoTbs', this.contactInfoTbs.inclusionResolver);
  }
}
