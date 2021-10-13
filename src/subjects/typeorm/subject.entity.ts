import BasicEntity from 'src/basic.entity';
import { Student } from 'src/students/typeorm/student.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

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
}
