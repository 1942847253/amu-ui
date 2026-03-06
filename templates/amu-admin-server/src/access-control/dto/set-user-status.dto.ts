import { IsIn } from 'class-validator'

export class SetUserStatusDto {
  @IsIn(['ACTIVE', 'LOCKED'])
  status!: 'ACTIVE' | 'LOCKED'
}
