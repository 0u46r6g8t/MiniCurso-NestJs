import { Column, Entity } from 'typeorm';
import BasicEntity from '../../basic.entity';
import { Student } from '../../students/typeorm/student.entity';

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
      to(value: string[]) {
        return value.join(';');
      },
      from(value: string | null) {
        return value?.split(';');
      },
    },
  })
  timeInTheWeek: string[];

  students: Student[];
}
