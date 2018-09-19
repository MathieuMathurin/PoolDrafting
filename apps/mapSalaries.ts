import * as fs from "fs";
import { mongoClient, collectionNames } from "../server/mongoClient";

const mapSalaries = async () => {
    const allSalaries = fs.readFileSync("../roster/salaries.txt", { encoding: "UTF8" });
    const lines = allSalaries.split('\r\n');
    
    const salaryByPlayer = lines.reduce((accumulator, line) => {
        const [name, salary] = line.split(':');
        const parsedSalary = salary && parseInt(salary.replace(/,/g, ""));
        accumulator[name] = isNaN(parsedSalary) ? null : parsedSalary;

        return accumulator;
    }, {})

    const db = await mongoClient.getDb();
    const playersName = (await db.collection(collectionNames.players).find({}).toArray()).map(p => p.name);
    const updates = playersName.map(name => {
        return {
            updateOne:
            {
                "filter": { "name": name },
                "update": { $set: { "salary": salaryByPlayer[name] } }
            }
        }
    })
    await db.collection(collectionNames.players).bulkWrite(updates);

    mongoClient.closeClient();
};

mapSalaries();