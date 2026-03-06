import { IsArray, IsString, MinLength } from 'class-validator'

export class UpsertPermissionDto {
  @IsString()
  @MinLength(2)
  code!: string

  @IsString()
  @MinLength(2)
  name!: string

  @IsString()
  @MinLength(2)
  module!: string

  @IsArray()
  apiScopes!: string[]
}
