import { LodashUtils } from '@utils/lodash';

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export class EmployeeModel {
  public id: string;
  public name: string;
  public email_address: string;
  public phone_number: string;
  public gender: GenderEnum;
  public cafe?: string | null;
  public cafe_id?: string | null;
  public days_worked?: number;

  constructor(initial?: Partial<EmployeeModel>) {
    this.id = LodashUtils.get(initial, 'id', '');
    this.name = LodashUtils.get(initial, 'name', '');
    this.email_address = LodashUtils.get(initial, 'email_address', '');
    this.phone_number = LodashUtils.get(initial, 'phone_number', '');
    this.gender = LodashUtils.get(initial, 'gender', GenderEnum.Male);
    this.cafe = LodashUtils.get(initial, 'cafe', null);
    this.cafe_id = LodashUtils.get(initial, 'cafe_id', null);
    this.days_worked = LodashUtils.get(initial, 'days_worked', 0);
  }
}
