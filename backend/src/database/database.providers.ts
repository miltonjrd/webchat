import { DataSource } from "typeorm";
import { DATABASE_CONFIG, DATA_SOURCE } from "src/constants";
import { ConfigService } from "src/config/config.service";
import { User } from "src/users/user.entity";

export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory(configService: ConfigService): Promise<DataSource> {
            const dataSource = new DataSource({
                type: 'mysql',
                ...configService.getDatabaseConfig(),
                entities: [
                    __dirname + '/../**/*.entity.{ts,js}'
                ],
                synchronize: true
            });

            return dataSource.initialize();
        },
        inject: [ConfigService]
    }
];