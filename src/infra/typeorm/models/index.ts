import fs from "fs";
import path from "path";
import { databaseCredential } from "../config/config";
import { DataSource, Repository } from "typeorm";
import { isProduction } from "../../../config";

const { username, password, database, host, dialect, port } = databaseCredential;

const models = fs.readdirSync(path.resolve(__dirname, "./"))
.filter((t) => ~t.indexOf('.ts') && !~t.indexOf("index") && !~t.indexOf(".map"))
.map(model => require(__dirname + "/" + model));

const modelNames = models.map((model) => Object.keys(model)[0]);
const modelClass = models.map((model) => Object.values<any>(model)[0]);

const connection = new DataSource({
    type: dialect,
    port,
    username,
    password,
    database,
    host,
    synchronize: isProduction ? true : false,
    logging: isProduction ? false : true,
    entities: modelClass,
});

type TypeOrmModelRepository =  {
  [key: string]: Repository<unknown>;
}

const typeOrmModelRepositories: TypeOrmModelRepository = {};
modelNames.forEach((model, index) => {
    typeOrmModelRepositories[model] = connection.getRepository(modelClass[index]); 
});

export { connection,  typeOrmModelRepositories };