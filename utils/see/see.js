import { checkbox, createPrompt, input, select } from "@inquirer/prompts"
import fs from "fs"

async function See(Ans) {
    fs.readFile(fileDirectory, "utf-8", (err, data) => {
        const Select = select({
            message: "Selecione a tarefa",
            choices: [
                {
                    name: "a",
                    description: JSON.parse(data),
                },
            ],
        })
        console.log(JSON.parse(data))
    })
}

export { See }
