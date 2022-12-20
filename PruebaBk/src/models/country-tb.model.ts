import {Entity, model, property, hasMany} from '@loopback/repository';
import {ContactInfoTb} from './contact-info-tb.model';

@model()
export class CountryTb extends Entity {
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
  countryCode: string;

  @property({
    type: 'string',
    required: true,
  })
  countryName: string;

  @hasMany(() => ContactInfoTb)
  contactInfoTbs: ContactInfoTb[];

  constructor(data?: Partial<CountryTb>) {
    super(data);
  }
}

export interface CountryTbRelations {
  // describe navigational properties here
}

export type CountryTbWithRelations = CountryTb & CountryTbRelations;
