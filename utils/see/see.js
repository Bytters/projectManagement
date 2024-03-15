import { select } from "@inquirer/prompts"
import fs from "fs"

async function See(Ans, file) {
    fs.readFile(file, "utf-8", async (err, data) => {
        if (err) {
            console.log(err)
        }
        let Data = JSON.parse(data)
        if (Data.length === 0) {
            console.log(
                "A lista de tarefas está vazia. Por favor, registre alguma atividade e tente novamente."
            )
            return
        }
        const seeTask = await select({
            message: "Selecione a tarefa",
            choices: Data,
        })

        console.log(`A situação da atividade é ${seeTask}`)
    })
}

export { See }
