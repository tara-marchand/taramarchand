import "reflect-metadata"
import { DataSource } from "typeorm"
import { ThoughtRecord } from "./entity/ThoughtRecord"

export const CbtDataSource = new DataSource({
    type: "sqlite",
    database: "./server/data/cbt/cbt-database.sqlite",
    synchronize: true,
    logging: false,
    entities: [ThoughtRecord],
    migrations: [],
    subscribers: [],
})
