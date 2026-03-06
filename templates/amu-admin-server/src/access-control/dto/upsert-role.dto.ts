import { IsArray, IsIn, IsString, MinLength } from 'class-validator'
import type { DataScope } from '../access-control.types'

export class UpsertRoleDto {
  @IsString()
  @MinLength(2)
  code!: string

  @IsString()
  @MinLength(2)
  name!: string

  @IsString()
  description!: string

  @IsIn(['ALL', 'DEPARTMENT', 'DEPARTMENT_AND_CHILDREN', 'SELF', 'CUSTOM'])
  dataScope!: DataScope

  @IsArray()
  permissionCodes!: string[]
}
