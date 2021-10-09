import BasicEntity from 'src/basic.entity';
import { Entity, Column } from 'typeorm';

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

  @Column({
    type: 'varchar',
    length: 75,
    nullable: false,
  })
  password: string;

  subjects: any;
}
