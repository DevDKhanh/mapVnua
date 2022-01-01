import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  MYSQL_HOST:string ;

  @IsString()
  MYSQL_PORT:string ;

  @IsString()
  MYSQL_DATABASE:string ;

  @IsString()

  MYSQL_USERNAME:string ;
  @IsString()

  MYSQL_PASSWORD:string ;
  
  @IsBoolean()
  MYSQL_SYNC:boolean ;

  @IsString()
  JWT_SECRET:string ;

  @IsString()
  GMAIL_ACCOOUNT:string ;

  @IsString()
  GMAIL_PASSWORD:string ;
}

export function envValidate(config: Record<string, unknown>) {
    //console.log(config);
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}