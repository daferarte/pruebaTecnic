import {Entity, model, property, belongsTo} from '@loopback/repository';
import {AppUserTb} from './app-user-tb.model';
import {TypeDocumentTb} from './type-document-tb.model';

@model()
export class UserDocumentTb extends Entity {
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
  document: string;

  @property({
    type: 'string',
    required: true,
  })
  placeExpedition: string;

  @property({
    type: 'date',
    required: true,
  })
  dateExpedition: string;

  @belongsTo(() => AppUserTb)
  appUserTbId: number;

  @belongsTo(() => TypeDocumentTb)
  typeDocumentTbId: number;

  constructor(data?: Partial<UserDocumentTb>) {
    super(data);
  }
}

export interface UserDocumentTbRelations {
  // describe navigational properties here
}

export type UserDocumentTbWithRelations = UserDocumentTb & UserDocumentTbRelations;
