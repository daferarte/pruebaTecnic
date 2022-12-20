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
  UserDocumentTb,
} from '../models';
import {AppUserTbRepository} from '../repositories';

export class AppUserTbUserDocumentTbController {
  constructor(
    @repository(AppUserTbRepository) protected appUserTbRepository: AppUserTbRepository,
  ) { }

  @get('/app-user-tbs/{id}/user-document-tb', {
    responses: {
      '200': {
        description: 'AppUserTb has one UserDocumentTb',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserDocumentTb),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserDocumentTb>,
  ): Promise<UserDocumentTb> {
    return this.appUserTbRepository.userDocumentTb(id).get(filter);
  }

  @post('/app-user-tbs/{id}/user-document-tb', {
    responses: {
      '200': {
        description: 'AppUserTb model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserDocumentTb)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AppUserTb.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {
            title: 'NewUserDocumentTbInAppUserTb',
            exclude: ['id'],
            optional: ['appUserTbId']
          }),
        },
      },
    }) userDocumentTb: Omit<UserDocumentTb, 'id'>,
  ): Promise<UserDocumentTb> {
    return this.appUserTbRepository.userDocumentTb(id).create(userDocumentTb);
  }

  @patch('/app-user-tbs/{id}/user-document-tb', {
    responses: {
      '200': {
        description: 'AppUserTb.UserDocumentTb PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {partial: true}),
        },
      },
    })
    userDocumentTb: Partial<UserDocumentTb>,
    @param.query.object('where', getWhereSchemaFor(UserDocumentTb)) where?: Where<UserDocumentTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.userDocumentTb(id).patch(userDocumentTb, where);
  }

  @del('/app-user-tbs/{id}/user-document-tb', {
    responses: {
      '200': {
        description: 'AppUserTb.UserDocumentTb DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserDocumentTb)) where?: Where<UserDocumentTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.userDocumentTb(id).delete(where);
  }
}
