import { ApiProperty } from '@nestjs/swagger';
import { domainToUnicode } from 'url';
var fs = require('fs');
var { promisify } = require('util');

export function radomText(length: number): string {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function radomNumber(length: number): string {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function createPagination<Data>(
  data: Data[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    total: total,
    records: data,
    currentPage: page,
    pageSize: pageSize,
  };
}
export class ResPaginationDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  pageSize: number;
}

export function resultData(message: string, data: any) {
  return {
    code: 200,
    message,
    data,
  };
}

export const deleteFile = async (file: string) => {
  try {
    const unlickSync = promisify(fs.unlink);
    await unlickSync(`./uploads/${file}`);
  } catch (err) {
    console.log(err);
  }
};
