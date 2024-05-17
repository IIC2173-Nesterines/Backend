import { IsInt, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class Coordinates {
  @IsInt()
  lat: number;

  @IsInt()
  lon: number;
}

class Flight {
  @ValidateNested()
  @Type(() => Coordinates)
  flight_coord: Coordinates;

  @IsInt()
  flight_id: number;

  @IsInt()
  price: number;
}

export class CreateRecommendationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Flight)
  flights: Flight[];

  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  ip_coord: Coordinates;
}
