import { ApiProperty } from "@nestjs/swagger";

export function radomText(length:number):string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *  charactersLength));
   }
   return result;
}
export function radomNumber(length:number):string{
   var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *  charactersLength));
   }
   return result;
}
export function createPagination<T>(data:T[],total:number,page:number,pageSize:number){
   return {
      total:total,
      records:data,
      currentPage:page,
      pageSize:pageSize
   }
}
export class ResPaginationDto {
   @ApiProperty()
   total:number;

   @ApiProperty()
   currentPage:number;

   @ApiProperty()
   pageSize:number;
} 