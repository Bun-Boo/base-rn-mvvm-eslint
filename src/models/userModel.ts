export interface IUserModel {
  id: number;
  name: string;
  email: string;
}

export default class UserModel implements IUserModel {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromJson(json: any): UserModel {
    return new UserModel(json.id, json.name, json.email);
  }
}
