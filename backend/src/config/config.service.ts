import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class ConfigService {
    private readonly envConfig;

    constructor() {
        this.envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '../../.env')));
    }

    getDatabaseConfig() {
        return {
            host: this.envConfig.DB_HOST,
            port: parseInt(this.envConfig.DB_PORT),
            username: this.envConfig.DB_USER,
            password: this.envConfig.DB_PASS,
            database: this.envConfig.DB_NAME,
        };
    }
}