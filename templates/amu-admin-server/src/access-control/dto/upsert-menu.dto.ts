import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class UpsertMenuDto {
  @IsString()
  @MinLength(1)
  key!: string

  @IsString()
  @MinLength(1)
  title!: string

  @IsString()
  @MinLength(1)
  icon!: string

  @IsIn(['DIRECTORY', 'MENU'])
  menuType!: 'DIRECTORY' | 'MENU'

  @IsOptional()
  @IsString()
  componentPath?: string

  @IsIn(['ACTIVE', 'DISABLED'])
  status!: 'ACTIVE' | 'DISABLED'

  @IsOptional()
  @IsString()
  parentId?: string

  @IsInt()
  @Min(0)
  sortOrder!: number

  @IsArray()
  permissionCodes!: string[]
}