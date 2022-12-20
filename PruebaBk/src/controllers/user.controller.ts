// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {ServiceKeys as keys} from '../keys/service-keys';
import {AppUserTbRepository, ContactInfoTbRepository, UserDocumentTbRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import {EncryptDecrypt} from '../services/encrypt-decrypt.service';
// import {inject} from '@loopback/core';



export class UserController {
  authService: AuthService
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository,
    @repository(UserDocumentTbRepository)
    public userDocumentTbRepository: UserDocumentTbRepository,
    @repository(ContactInfoTbRepository)
    public contactInfoTbRepository: ContactInfoTbRepository
  ) {
    this.authService = new AuthService(appUserTbRepository);
  }

  @post('/registro', {
    responses: {
      '200': {
        describe: 'carga de información'
      }
    }
  })
  async registro(
    @requestBody() data: any
  ): Promise<object> {
    let {appUserTB, userDocumentTB, contactInfoTB} = data;
    let pwd = new EncryptDecrypt(keys.MD5).Encrypt(appUserTB.password);
    let pwd2 = new EncryptDecrypt(keys.AES).Encrypt(pwd);
    let tk = await this.authService.GenerateToken(appUserTB);
    appUserTB.verificationToken = tk;
    appUserTB.password = pwd2;
    //guardado
    let appUserTbG = await this.appUserTbRepository.create(appUserTB);
    userDocumentTB.appUserTbId = appUserTbG.id;
    //userDocumentTB.appUserTbId = Number(appUserTbG.getId);
    contactInfoTB.appUserTbId = appUserTbG.id;
    let userDocumentTBG = await this.userDocumentTbRepository.create(userDocumentTB);
    let contactInfoTBG = await this.contactInfoTbRepository.create(contactInfoTB);
    return {appUserTbG, userDocumentTBG, contactInfoTBG};
  }

  @post('/login', {
    responses: {
      '200': {
        describe: 'carga de información'
      }
    }
  })
  async login(
    @requestBody() data: any
  ): Promise<object> {
    let user = await this.authService.Identify(data.password, data.password);
    if (user) {
      let tk = this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("usuario o password invalido");
    }
  }

}
