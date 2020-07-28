import * as bcrypt from 'bcrypt';
import {injectable} from 'inversify';
import {IPassword} from './passwordInterface';

@injectable()
export class Password implements IPassword {
    
    async encrypt(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }
 
    async decrypt(hashedPassword: string, unHashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(unHashedPassword, hashedPassword);
    }
}