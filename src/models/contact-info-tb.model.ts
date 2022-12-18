import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<ContactInfoTb>) {
    super(data);
  }
}

export interface ContactInfoTbRelations {
  // describe navigational properties here
}

export type ContactInfoTbWithRelations = ContactInfoTb & ContactInfoTbRelations;
