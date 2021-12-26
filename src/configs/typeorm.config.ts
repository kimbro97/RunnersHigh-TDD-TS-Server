import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12081208',
    database: 'nestrunnershigh',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
}