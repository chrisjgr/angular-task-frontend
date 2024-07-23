import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

    // TODO: Validate User
  hasUser(): boolean {
    return false;
  }
}
