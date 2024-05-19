import { IsString } from 'class-validator';

export class CreateRecommendationsDto {
  @IsString()
  recommendationsId: string;

  @IsString()
  date: string;

  @IsString()
  sessionId: string;
}
