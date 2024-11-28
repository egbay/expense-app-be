import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user',
  })
  id: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user, either USER or ADMIN',
  })
  role: 'USER' | 'ADMIN';

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The timestamp when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    description: 'The timestamp when the user was last updated',
  })
  updatedAt: Date;
}
