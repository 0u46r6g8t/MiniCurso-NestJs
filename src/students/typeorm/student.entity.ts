import { Exclude } from 'class-transformer';
import BasicEntity from 'src/basic.entity';
import { Subject } from 'src/subjects/typeorm/subject.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Subject, (subject) => subject.students, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  subjects: Subject[];
}
