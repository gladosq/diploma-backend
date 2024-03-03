import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {DifficultyModuleEnum} from '../../types/enum';

@Entity()
export class EducationModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  theme: string;

  @Column({
    nullable: false,
    default: false,
  })
  isPublished: boolean;

  @Column({
    nullable: false,
    default: DifficultyModuleEnum.Medium,
  })
  difficulty: DifficultyModuleEnum;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  article: [];

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  testing: [];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
}
