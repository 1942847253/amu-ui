import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpsertDepartmentDto {
  @IsString()
  @MinLength(1)
  id!: string

  @IsString()
  @MinLength(2)
  name!: string

  @IsOptional()
  @IsString()
  parentId?: string
}