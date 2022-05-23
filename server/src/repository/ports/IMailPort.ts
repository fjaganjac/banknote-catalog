export interface TSendMailOptions {
  from: string;
  to: string;
  cc?: string | Array<any>;
  subject: string;
  text: string;
  html: string;
}

export interface IMailPort {
  sendMail(options: TSendMailOptions): Promise<any>;
}
