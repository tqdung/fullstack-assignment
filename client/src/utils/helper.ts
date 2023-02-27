export class Validation {
  static RegexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  static isValidEmail(input: string): boolean {
    return this.RegexEmail.test(String(input).toLowerCase());
  }

  static RegexPhoneNumber = /[8|9]\d{7}/;
  static isValidPhoneNumber(input: string): boolean {
    return this.RegexPhoneNumber.test(String(input));
  }
}
export class Helpers {
  static generateID(length = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
