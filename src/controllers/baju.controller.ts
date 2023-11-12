import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Baju} from '../models';
import {BajuRepository} from '../repositories';

export class BajuController {
  constructor(
    @repository(BajuRepository)
    public bajuRepository : BajuRepository,
  ) {}

  @post('/bajus')
  @response(200, {
    description: 'Baju model instance',
    content: {'application/json': {schema: getModelSchemaRef(Baju)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baju, {
            title: 'NewBaju',
            exclude: ['id'],
          }),
        },
      },
    })
    baju: Omit<Baju, 'id'>,
  ): Promise<Baju> {
    return this.bajuRepository.create(baju);
  }

  @get('/bajus/count')
  @response(200, {
    description: 'Baju model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Baju) where?: Where<Baju>,
  ): Promise<Count> {
    return this.bajuRepository.count(where);
  }

  @get('/bajus')
  @response(200, {
    description: 'Array of Baju model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Baju, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Baju) filter?: Filter<Baju>,
  ): Promise<Baju[]> {
    return this.bajuRepository.find(filter);
  }

  @patch('/bajus')
  @response(200, {
    description: 'Baju PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baju, {partial: true}),
        },
      },
    })
    baju: Baju,
    @param.where(Baju) where?: Where<Baju>,
  ): Promise<Count> {
    return this.bajuRepository.updateAll(baju, where);
  }

  @get('/bajus/{id}')
  @response(200, {
    description: 'Baju model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Baju, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Baju, {exclude: 'where'}) filter?: FilterExcludingWhere<Baju>
  ): Promise<Baju> {
    return this.bajuRepository.findById(id, filter);
  }

  @patch('/bajus/{id}')
  @response(204, {
    description: 'Baju PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baju, {partial: true}),
        },
      },
    })
    baju: Baju,
  ): Promise<void> {
    await this.bajuRepository.updateById(id, baju);
  }

  @put('/bajus/{id}')
  @response(204, {
    description: 'Baju PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() baju: Baju,
  ): Promise<void> {
    await this.bajuRepository.replaceById(id, baju);
  }

  @del('/bajus/{id}')
  @response(204, {
    description: 'Baju DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bajuRepository.deleteById(id);
  }
}
