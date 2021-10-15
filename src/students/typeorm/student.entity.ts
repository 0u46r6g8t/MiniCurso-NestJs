import BasicEntity from 'src/basic.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Subject } from 'src/subjects/typeorm/subject.entity';
@Entity('tb_students')
export class Student extends BasicEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 75,
    unique: true,
    nullable: false,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 75,
    nullable: false,
  })
  password: string;

  @ManyToMany((type) => Subject)
  @JoinTable()
  subjects: Subject[];
}
