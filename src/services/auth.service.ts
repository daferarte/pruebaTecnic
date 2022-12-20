import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {AppUserTb} from '../models';
import {AppUserTbRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
const jwt = require("jsonwebtoken");
export class AuthService {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository
  ) {

  }

  async Identify(username: string, password: string): Promise<AppUserTb | false> {
    let user = await this.appUserTbRepository.findOne({where: {username: username}});
    if (user) {
      let crypPass = new EncryptDecrypt(keys.AES).Encrypt(password);
      if (user.password == crypPass) {
        return user;
      }
    }
    return false;
  }

  async GenerateToken(user: AppUserTb) {
    user.password = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: user.id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email
      }
    },
      keys.JWT_SECRET_KEY
    );
    return token;
  }
}
