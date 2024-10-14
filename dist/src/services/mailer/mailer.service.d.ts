import { MailerService } from '@nestjs-modules/mailer';
import { ICreateEmail } from './interfaces/createEmail.interface';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail({ roomId, timeStart, timeEnd, summaryEvent, fio, email, phoneNumber, }: ICreateEmail): Promise<string>;
}
