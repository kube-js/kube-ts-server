import { BaseError } from 'make-error';

export default class RemindPasswordError extends BaseError {
  public email: string;

  constructor(email: string){
    super();
    this.email = email;
  } 
}
