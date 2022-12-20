import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CountryTb} from './country-tb.model';
import {AppUserTb} from './app-user-tb.model';

@model()
export class ContactInfoTb extends Entity {
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
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  cellPhone: string;

  @property({
    type: 'string',
    required: true,
  })
  emergencyName: string;

  @property({
    type: 'string',
    required: true,
  })
  emergencyPhone: string;

  @belongsTo(() => CountryTb)
  countryTbId: number;

  @belongsTo(() => AppUserTb)
  appUserTbId: number;

  constructor(data?: Partial<ContactInfoTb>) {
    super(data);
  }
}

export interface ContactInfoTbRelations {
  // describe navigational properties here
}

export type ContactInfoTbWithRelations = ContactInfoTb & ContactInfoTbRelations;
