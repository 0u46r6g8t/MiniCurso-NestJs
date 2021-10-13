import BasicEntity from 'src/basic.entity';
import { Student } from 'src/students/typeorm/student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('tb_subjects')
export class Subject extends BasicEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 35,
  })
  nameTeacher: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  workload: number;

  @Column({
    nullable: false,
    type: 'varchar',
    transformer: {
      to(value) {
        return value.join(';');
      },
      from(value) {
        return value.split(';');
      },
    },
  })
  timeInTheWeek: string[];

  @ManyToOne(() => Student, (student) => student.subjects, {
    eager: true,
    nullable: false,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  student: Student;
}
