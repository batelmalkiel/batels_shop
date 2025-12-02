import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
declare const GoogleAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleAuthStrategy extends GoogleAuthStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
