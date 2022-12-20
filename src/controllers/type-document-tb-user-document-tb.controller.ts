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
  TypeDocumentTb,
  UserDocumentTb,
} from '../models';
import {TypeDocumentTbRepository} from '../repositories';

export class TypeDocumentTbUserDocumentTbController {
  constructor(
    @repository(TypeDocumentTbRepository) protected typeDocumentTbRepository: TypeDocumentTbRepository,
  ) { }

  @get('/type-document-tbs/{id}/user-document-tbs', {
    responses: {
      '200': {
        description: 'Array of TypeDocumentTb has many UserDocumentTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserDocumentTb)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserDocumentTb>,
  ): Promise<UserDocumentTb[]> {
    return this.typeDocumentTbRepository.userDocumentTbs(id).find(filter);
  }

  @post('/type-document-tbs/{id}/user-document-tbs', {
    responses: {
      '200': {
        description: 'TypeDocumentTb model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserDocumentTb)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TypeDocumentTb.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {
            title: 'NewUserDocumentTbInTypeDocumentTb',
            exclude: ['id'],
            optional: ['typeDocumentTbId']
          }),
        },
      },
    }) userDocumentTb: Omit<UserDocumentTb, 'id'>,
  ): Promise<UserDocumentTb> {
    return this.typeDocumentTbRepository.userDocumentTbs(id).create(userDocumentTb);
  }

  @patch('/type-document-tbs/{id}/user-document-tbs', {
    responses: {
      '200': {
        description: 'TypeDocumentTb.UserDocumentTb PATCH success count',
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
    return this.typeDocumentTbRepository.userDocumentTbs(id).patch(userDocumentTb, where);
  }

  @del('/type-document-tbs/{id}/user-document-tbs', {
    responses: {
      '200': {
        description: 'TypeDocumentTb.UserDocumentTb DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserDocumentTb)) where?: Where<UserDocumentTb>,
  ): Promise<Count> {
    return this.typeDocumentTbRepository.userDocumentTbs(id).delete(where);
  }
}
