export interface IPassword {
    encrypt: (password: string) => Promise<string>;

    decrypt: (hashedPassword: string, unHashedPassword: string) => Promise<boolean>;
    
}