export class User {
  id: string;
  firstname: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string; //nazwy ról
  isActive: boolean;



  constructor(id: string = null,
              firstname: string = null,
              surname: string = null,
              phoneNumber: string = null,
              email: string = null,
              password: string = null,
              role: string = null,
              isActive: boolean = false
             ) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
  }
}
