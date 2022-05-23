import * as nodemailer from "nodemailer";

import { TSendMailOptions, IMailPort } from "./IMailPort";
import TEmailConfiguration from "../../config/TEmailConfiguration";
import { IConfiguration } from "../../config";

let transport: nodemailer.Transporter;

const MailPort = ({ config }: { config: IConfiguration }) => {
  const { host, port, secure, user, password } = config.getEmailConfiguration();
  if (!transport) {
    transport = nodemailer.createTransport({
      host,
      port,
      secure,
      tls: {
        rejectUnauthorized: false
      },
      auth: user
        ? {
            user: user,
            pass: password
          }
        : undefined
    });
  }

  return {
    async sendMail(options: TSendMailOptions) {
      const { from, to, subject, text, html, cc } = options;
      return transport.sendMail({
        from,
        to,
        cc,
        subject,
        text,
        html
      });
    }
  } as IMailPort;
};

export default MailPort;
