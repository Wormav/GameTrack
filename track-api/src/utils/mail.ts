
import { Client, SendEmailV3_1 } from "node-mailjet";

class Mail {
  mailjet: Client;
  templates: Record<string, number> = {
    'requestResetPassword': 5081777
  }
  static adminEmail = process.env.ADMIN_EMAIL as string
  static reportEmail = process.env.REPORT_EMAIL as string
  static reportName = process.env.REPORT_NAME as string
  
  constructor() {
    this.mailjet = new Client({
      apiKey: process.env.MAIL_API_KEY,
      apiSecret: process.env.MAIL_API_SECRET,
      config: {},
      options: {}
    })
  }

  
  async sendMailFromTemplate(templateName: string, to: string, from = process.env.ADMIN_EMAIL as string, fromName = "Admin", variables = {}): Promise<boolean> {
    try {
      const data: SendEmailV3_1.Body = {
        Messages: [
          {
            From: {
              Email: from,
            },
            TemplateID: this.templates[templateName],
            TemplateErrorDeliver: true,
            TemplateErrorReporting: {
              Email: from,
              Name: fromName,
            },
            TemplateLanguage: true,
            To: [
              {
                Email: to,
              },
            ],
            Variables: variables
          },
        ],
      };
      await this.mailjet.post('send', { version: 'v3.1' }).request(data);
      return true
    } catch (error) {
      console.log(error)
      return false
    }

  }
}

export default Mail;
