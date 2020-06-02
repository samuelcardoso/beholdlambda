import * as Joi from '@hapi/joi';
import PetHandler from './pet.handler';
import { Route } from '../../utils/serverless-openapi';

// validations
const validation = {
  required: Joi.string().required(),
  petId: Joi.number().integer()
    .description('Unique identifier for pet in database')
    .example(1)
    .label('PetId'),

  petName: Joi.string()
    .description('Name of the pet')
    .example('Garfield')
    .label('PetName'),

  limit: Joi.number().integer().positive()
    .description('Number of items to return')
    .example(25)
    .label('QueryLimit'),

  offset: Joi.number().integer().min(0)
    .description('Starting offset for returning items')
    .example(0)
    .label('QueryOffset')
};

// tags can be either a simple string or a tag object
const tag = {
  pets: {
    name: 'pets',
    description: 'Pet operations'
  }
};

// api routes
const routes: Route[] = [
  {
    method: 'GET',
    path: '/pets',
    handler: PetHandler.getPets,
    summary: 'List pets',
    description: 'Returns all pets in database',
    tags: [tag.pets],
    validation: {
      queryStringParameters: {
        limit: validation.limit,
        offset: validation.offset
      }
    },
    responses: {
      200: { description: 'List of pets in database' }
    }
  },
  {
    method: 'GET',
    path: '/pets/{id}',
    handler: PetHandler.getPetById,
    summary: 'Get a pet by its id',
    description: 'Returns a pet by its id in database',
    tags: ['pets'],
    validation: {
      pathParameters: {
        id: validation.petId
      }
    },
    responses: {
      200: { description: 'Pet object corresponding to id' },
      404: { description: 'Pet not found' }
    }
  },
  {
    method: 'POST',
    path: '/pets',
    handler: PetHandler.createPet,
    summary: 'Create pet',
    description: 'Crete a new pet into the database',
    tags: ['pets'],
    validation: {
      payload: Joi.object({
        name: validation.petName.required()
      })
    },
    responses: {
      201: { description: 'Pet created succesfully' }
    }
  },
  {
    method: 'PATCH',
    path: '/pets/{id}',
    handler: PetHandler.updatePetById,
    summary: 'Update pet',
    description: 'Update an existing pet in the database',
    tags: ['pets'],
    validation: {
      pathParameters: {
        id: validation.petId
      },
      payload: Joi.object({
        name: validation.petName
      })
    },
    responses: {
      200: { description: 'Pet updated succesfully' },
      404: { description: 'Pet not found' }
    }
  },
  {
    method: 'DELETE',
    path: '/pets/{id}',
    handler: PetHandler.deletePetById,
    summary: 'Delete a pet by its id',
    description: 'Deletes a pet by its id in database',
    tags: ['pets'],
    validation: {
      pathParameters: {
        id: validation.petId
      }
    },
    responses: {
      200: { description: 'Pet deleted succesfully' },
      404: { description: 'Pet not found' }
    }
  }
];

export default routes;
