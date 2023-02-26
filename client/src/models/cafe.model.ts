import { LodashUtils } from '@utils/lodash';

export class CafeModel {
  public id: string;
  public name: string;
  public description: string;
  public location: string;
  public logo?: string | null;
  public employees?: number;

  constructor(initial?: Partial<CafeModel>) {
    this.id = LodashUtils.get(initial, 'id', '');
    this.name = LodashUtils.get(initial, 'name', '');
    this.description = LodashUtils.get(initial, 'description', '');
    this.location = LodashUtils.get(initial, 'location', '');
    this.logo = LodashUtils.get(initial, 'logo', null);
    this.employees = LodashUtils.get(initial, 'employees', 0);
  }
}
