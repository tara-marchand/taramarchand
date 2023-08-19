import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ThoughtRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventOrSituation: string;

  @Column()
  feelingsStart: string;

  @Column()
  automaticThoughts: string;

  @Column()
  thinkingErrors: string;

  @Column()
  alternativeThoughts: string;

  @Column()
  feelingsEnd: string;
}
