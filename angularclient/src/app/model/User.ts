export class User {
  id: string;
  firstname: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  rolesIDs: string[]; //nazwy ról
  isActive: boolean; //nazwy ról



  constructor(id: string = null,
              firstname: string = null,
              surname: string = null,
              phoneNumber: string = null,
              email: string = null,
              password: string = null,
              rolesIDs: string[] = ['ROLE_REGULAR_USER'],
              isActive: boolean = false
             ) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.rolesIDs = rolesIDs;
    this.isActive = isActive;
  }
}
