// import PetModel from './pet.model';
import { createLogger } from '../../utils/logger.util';

const logger = createLogger('PetService');

export default class PetService {
  private conn: any;

  static get(conn) {
    const inst = new PetService();
    inst.conn = conn;
    return inst;
  }

  async getPet(id: number): Promise<any> {
    logger.info(`Creating a pet... ${id}`);
    // return PetModel.get(this.conn).findOne({
    //   where: { id: id }
    // });
  }
  // eslint-disable-next-line
  async getAllPets(opts: any): Promise<any[]> {
    logger.info('Get all pets...');
    return [];
  }
  // eslint-disable-next-line
  async insertPet(pet: any): Promise<any> {
    logger.info('Insert a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }
  // eslint-disable-next-line
  async updatePet(pet: any): Promise<any> {
    logger.info('Update a pet...');
    return {
      id: 1,
      name: 'Dog 1'
    };
  }
  // eslint-disable-next-line
  async deletePet(id: number): Promise<any> {
    logger.info('Insert a pet...');
    // await PetModel.get(this.conn).destroy();
  }
}
