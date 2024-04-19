// export class CreateFlightDto {
//   "flights": [
//     {
//       "departureAirport": {
//         "name": string;
//         "id": string;
//         "time": Date;
//       };
//       "arrivalAirport": {
//         "name": string;
//         "id": string;
//         "time": Date;
//       };
//       "duration": number;
//       "airplane": string;
//       "airline": string;
//       "airline_logo": string;
//     },
//   ];
//   "price": number;
//   "carbonEmission": { "this_flight": number };
//   "airlineLogo": string;
//   "currency": string;
// }

import {
  IsString,
  IsNumber,
  IsArray,
  // IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AirportDto {
  @IsString()
  name: string;

  @IsString()
  id: string;

  @IsString()
  time: string;
}

class FlightDto {
  @ValidateNested()
  @Type(() => AirportDto)
  departure_airport: AirportDto;

  @ValidateNested()
  @Type(() => AirportDto)
  arrival_airport: AirportDto;

  @IsNumber()
  duration: number;

  @IsString()
  airplane: string;

  @IsString()
  airline: string;

  @IsString()
  airline_logo: string;
}

class CarbonEmissionDto {
  @IsNumber()
  this_flight: number;
}

export class CreateFlightDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightDto)
  flights: FlightDto[];

  @IsNumber()
  price: number;

  @ValidateNested()
  @Type(() => CarbonEmissionDto)
  carbonEmission: CarbonEmissionDto;

  @IsString()
  airlineLogo: string;

  @IsString()
  currency: string;
}

export class CreateFlightModelDto {
  departureAirportId: string;
  departureDate: Date;
  arrivalAirportId: string;
  arrivalDate: Date;
  duration: number;
  airplane: string;
  airline: string;
  // airlineLogo: createFlightDto.flights[0].airline_logo,
  price: number;
  carbonEmission: number;
  airlineLogo: string;
  currency: string;
  quantity: number;
}
