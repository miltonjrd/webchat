import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE, repositories } from 'src/constants';

export const userProviders = [
    {
        provide: repositories.USER_REPOSITORY,
        useFactory(dataSource: DataSource): Repository<User> {
            return dataSource.getRepository(User);
        },
        inject: [DATA_SOURCE]
    }
];