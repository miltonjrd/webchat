import { DataSource, Repository } from 'typeorm';
import { DATA_SOURCE, repositories } from '../constants';
import { Message } from './message.entity';

export const messageProviders = [
    {
        provide: repositories.MESSAGE_REPOSITORY,
        useFactory(dataSource: DataSource): Repository<Message> {
            return dataSource.getRepository(Message);
        },
        inject: [DATA_SOURCE]
    }
];