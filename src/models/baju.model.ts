import {Entity, model, property} from '@loopback/repository';

@model()
export class Baju extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

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
  desc: string;

  @property({
    type: 'number',
    required: true,
  })
  harga: number;


  constructor(data?: Partial<Baju>) {
    super(data);
  }
}

export interface BajuRelations {
  // describe navigational properties here
}

export type BajuWithRelations = Baju & BajuRelations;
