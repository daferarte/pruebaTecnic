import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserDocumentTb} from './user-document-tb.model';

@model()
export class TypeDocumentTb extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nameTypeDocument: string;

  @hasMany(() => UserDocumentTb)
  userDocumentTbs: UserDocumentTb[];

  constructor(data?: Partial<TypeDocumentTb>) {
    super(data);
  }
}

export interface TypeDocumentTbRelations {
  // describe navigational properties here
}

export type TypeDocumentTbWithRelations = TypeDocumentTb & TypeDocumentTbRelations;
