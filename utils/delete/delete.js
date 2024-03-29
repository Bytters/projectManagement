import { select, input } from "@inquirer/prompts"
import fs from "fs"

async function Delete(file, task) {
    fs.readFile(file, "utf-8", async (err, data) => {
        if (err) return
        let Data = JSON.parse(data)
        console.log(Data)

        const Choice = Number(
            await input({
                message: `Escolha um numero de 1 a ${Data.length} para deletar:`,
            })
        )

        if (Choice) {
            let getNum = Choice - 1
            const choice = Data[getNum]

            Data.splice(getNum, 1)
            const newData = JSON.stringify(Data, null, 2) // converte para JSON

            fs.writeFile(file, newData, "utf8", (err) => {
                console.log(err || "tarefa deletada!")
            })
        }
    })
}

export { Delete }
