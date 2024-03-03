import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { JobTitleEnum, UserRoleEnum } from "../../types/enum";
import {EducationModule} from './education-module.entity';
import {Results} from './results.entity';
import {ResultModule} from '../result/result.module';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.Developer,
  })
  role: UserRoleEnum;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: JobTitleEnum,
    default: null,
  })
  jobTitle: JobTitleEnum;

  @Column({
    nullable: false,
    default: '',
  })
  grade: string;

  // @OneToMany(() => Results, result => result.user)
  // @JoinColumn()
  // results: Results;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
}
