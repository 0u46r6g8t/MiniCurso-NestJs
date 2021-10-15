import { Exclude } from 'class-transformer';
import BasicEntity from 'src/basic.entity';
import { Column, Entity } from 'typeorm';

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

  subjects: any;
}
