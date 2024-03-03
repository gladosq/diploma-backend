import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {EducationModule} from './education-module.entity';
import {Users} from './users.entity';
import {Result} from '../../types/result';

@Entity()
export class Results {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, {eager: true, cascade: true})
  @JoinColumn({ name: 'userId'})
  user: any;

  @ManyToOne(() => EducationModule, (module) => module.id, {eager: true, cascade: true})
  @JoinColumn({ name: 'moduleId' })
  module: any;

  // @ManyToOne(() => EducationModule)
  // @JoinColumn({name: 'moduleId', referencedColumnName: 'id'})
  // module: string;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: [],
  })
  result: Result[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
}
