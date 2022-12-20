import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CountryTb,
  ContactInfoTb,
} from '../models';
import {CountryTbRepository} from '../repositories';

export class CountryTbContactInfoTbController {
  constructor(
    @repository(CountryTbRepository) protected countryTbRepository: CountryTbRepository,
  ) { }

  @get('/country-tbs/{id}/contact-info-tbs', {
    responses: {
      '200': {
        description: 'Array of CountryTb has many ContactInfoTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContactInfoTb)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContactInfoTb>,
  ): Promise<ContactInfoTb[]> {
    return this.countryTbRepository.contactInfoTbs(id).find(filter);
  }

  @post('/country-tbs/{id}/contact-info-tbs', {
    responses: {
      '200': {
        description: 'CountryTb model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfoTb)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CountryTb.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {
            title: 'NewContactInfoTbInCountryTb',
            exclude: ['id'],
            optional: ['countryTbId']
          }),
        },
      },
    }) contactInfoTb: Omit<ContactInfoTb, 'id'>,
  ): Promise<ContactInfoTb> {
    return this.countryTbRepository.contactInfoTbs(id).create(contactInfoTb);
  }

  @patch('/country-tbs/{id}/contact-info-tbs', {
    responses: {
      '200': {
        description: 'CountryTb.ContactInfoTb PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {partial: true}),
        },
      },
    })
    contactInfoTb: Partial<ContactInfoTb>,
    @param.query.object('where', getWhereSchemaFor(ContactInfoTb)) where?: Where<ContactInfoTb>,
  ): Promise<Count> {
    return this.countryTbRepository.contactInfoTbs(id).patch(contactInfoTb, where);
  }

  @del('/country-tbs/{id}/contact-info-tbs', {
    responses: {
      '200': {
        description: 'CountryTb.ContactInfoTb DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContactInfoTb)) where?: Where<ContactInfoTb>,
  ): Promise<Count> {
    return this.countryTbRepository.contactInfoTbs(id).delete(where);
  }
}
