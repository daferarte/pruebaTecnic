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
  AppUserTb,
  ContactInfoTb,
} from '../models';
import {AppUserTbRepository} from '../repositories';

export class AppUserTbContactInfoTbController {
  constructor(
    @repository(AppUserTbRepository) protected appUserTbRepository: AppUserTbRepository,
  ) { }

  @get('/app-user-tbs/{id}/contact-info-tb', {
    responses: {
      '200': {
        description: 'AppUserTb has one ContactInfoTb',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ContactInfoTb),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContactInfoTb>,
  ): Promise<ContactInfoTb> {
    return this.appUserTbRepository.contactInfoTb(id).get(filter);
  }

  @post('/app-user-tbs/{id}/contact-info-tb', {
    responses: {
      '200': {
        description: 'AppUserTb model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfoTb)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AppUserTb.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {
            title: 'NewContactInfoTbInAppUserTb',
            exclude: ['id'],
            optional: ['appUserTbId']
          }),
        },
      },
    }) contactInfoTb: Omit<ContactInfoTb, 'id'>,
  ): Promise<ContactInfoTb> {
    return this.appUserTbRepository.contactInfoTb(id).create(contactInfoTb);
  }

  @patch('/app-user-tbs/{id}/contact-info-tb', {
    responses: {
      '200': {
        description: 'AppUserTb.ContactInfoTb PATCH success count',
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
    return this.appUserTbRepository.contactInfoTb(id).patch(contactInfoTb, where);
  }

  @del('/app-user-tbs/{id}/contact-info-tb', {
    responses: {
      '200': {
        description: 'AppUserTb.ContactInfoTb DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContactInfoTb)) where?: Where<ContactInfoTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.contactInfoTb(id).delete(where);
  }
}
