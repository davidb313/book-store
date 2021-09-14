import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

//Decorador que provee los metodos necesarios para interactuar con la base de datos
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
