import { IsMongoId, IsString } from 'class-validator';

export class MongoIdDto {
  @IsMongoId({ message: 'Enter a valid param id' })
  @IsString({ message: 'Enter a valid param id' })
  id: string;
}
