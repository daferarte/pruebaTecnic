import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<TypeDocumentTb>) {
    super(data);
  }
}

export interface TypeDocumentTbRelations {
  // describe navigational properties here
}

export type TypeDocumentTbWithRelations = TypeDocumentTb & TypeDocumentTbRelations;
