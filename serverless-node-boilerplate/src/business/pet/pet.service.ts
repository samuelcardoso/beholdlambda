import { createLogger } from '../../utils/logger.util';
import Pet from './pet.model';

const logger = createLogger('PetService');

export default class PetService {
  private conn: any;

  static get(conn) {
    const inst = new PetService();
    inst.conn = conn;
    return inst;
  }

  async getAllPets(_opts: any): Promise<Pet[]> {
    logger.info('Get all pets...');
    return [];
  }

  async getPet(_id: number): Promise<Pet> {
    logger.info('Get a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }

  async insertPet(_pet: any): Promise<Pet> {
    logger.info('Insert a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }

  async updatePet(_pet: any): Promise<Pet> {
    logger.info('Update a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }

  async deletePet(_id: number): Promise<Pet> {
    logger.info('Delete a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }
}
