import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [
        `${
          this.isProduction()
            ? 'dist/**/*.entity{.ts,.js}'
            : 'src/**/*.entity{.ts,.js}'
        }`,
      ],

      migrationsTableName: 'migration',

      migrations: [
        `${
          this.isProduction() ? 'dist/src/migration/*.js' : 'src/migration/*.ts'
        }`,
      ],

      cli: {
        migrationsDir: `${
          this.isProduction() ? 'dist/src/migration/*.js' : 'src/migration/*.ts'
        }`,
      },
      ssl: this.isProduction() ? { rejectUnauthorized: false } : false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'ACCESS_EXP',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'FRONT_URL',
]);

export { configService };
