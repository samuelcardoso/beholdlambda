import * as _ from 'lodash';
import * as Boom from '@hapi/boom';
import PetService from './pet.service';
import { HandlerEvent, reply } from '../../utils/serverless-openapi';
import { Context } from 'aws-lambda';

export default class PetHandler {
  static async getPetById(event: HandlerEvent, context?: Context, cache?: any) {
    const { pathParameters } = event;
    const id = pathParameters!['id'];
    const pet = await PetService.get(cache.conn).getPet(Number(id));
    if (!pet) {
      throw Boom.notFound(`Pet id:${id} not found`);
    }
    return reply(pet);
  }

  static async getPets(event: HandlerEvent, context?: Context, cache?: any) {
    const limit = Number(_.get(event.queryStringParameters, 'limit', '10'));
    const offset = Number(_.get(event.queryStringParameters, 'offset', '0'));
    const pets = await PetService.get(cache.conn).getAllPets({ limit, offset });
    return reply(pets);
  }

  static async createPet(event: HandlerEvent, context?: Context, cache?: any) {
    const { payload } = event;
    const pet = await PetService.get(cache.conn).insertPet(payload);
    return reply(pet, { statusCode: 201 });
  }

  static async updatePetById(event: HandlerEvent, context?: Context, cache?: any) {
    const { pathParameters, payload } = event;
    const id = pathParameters!['id'];
    const pet = await PetService.get(cache.conn).updatePet({ id, ...payload });
    return reply(pet);
  }

  static async deletePetById(event: HandlerEvent, context?: Context, cache?: any) {
    const { pathParameters } = event;
    const id = pathParameters!['id'];
    const result = await PetService.get(cache.conn).deletePet(Number(id));
    return reply({ result });
  }
}
