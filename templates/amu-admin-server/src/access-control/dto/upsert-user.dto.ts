import { IsArray, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator'

export class UpsertUserDto {
  @IsString()
  @MinLength(2)
  username!: string

  @IsString()
  @MinLength(2)
  displayName!: string

  @IsEmail()
  email!: string

  @IsString()
  departmentId!: string

  @IsString()
  title!: string

  @IsIn(['ACTIVE', 'LOCKED'])
  status!: 'ACTIVE' | 'LOCKED'

  @IsArray()
  roleCodes!: string[]

  @IsArray()
  directPermissionCodes!: string[]

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string
}
