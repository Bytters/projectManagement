import { select, input } from "@inquirer/prompts"
import fs from "fs"

async function Edit(file, task) {
    fs.readFile(file, "utf-8", async (err, data) => {
        if (err) return
        let Data = JSON.parse(data)
        console.log(Data)

        const Choice = Number(
            await input({
                message: `Escolha um numero de 1 a ${Data.length} para editar:`,
            })
        )

        if (Choice) {
            let getNum = Choice - 1
            const choice = Data[getNum]
            const Select = await select({
                message: "Escolha alguma opção que deseja editar",
                choices: [
                    {
                        name: "Nome",
                        value: "name",
                    },
                    {
                        name: "Descrição",
                        value: "description",
                    },
                    {
                        name: "Situação",
                        value: "value",
                    },
                ],
            })

            console.log(Select)

            const saveFile = (data) => {
                Data[getNum][Select] = data
                const newData = JSON.stringify(Data, null, 2) // converte para JSON
                console.log(Data)

                fs.writeFile(file, newData, "utf8", (err) => {
                    console.log(err || "tarefa atualizada")
                })
            }

            const verifySelect = (type) => {
                // choices
                let name = Data.findIndex((obj) => obj.name === choice[Select])
                let description = Data.findIndex((obj) => obj.description === choice[Select])
                let value = Data.findIndex((obj) => obj.value === choice[Select])

                const options = {
                    name: async () => {
                        if (name !== -1) {
                            let Name = await input({
                                message: "Qual o novo nome?",
                            })

                            saveFile(Name)
                        }
                    },
                    description: async () => {
                        console.log(description !== -1)
                        if (description !== -1) {
                            let Description = await input({
                                message: "Qual a nova descrição?",
                            })

                            saveFile(Description)
                        }
                    },
                    value: async () => {
                        if (value !== -1) {
                            let Progress = await select({
                                message: "Qual A situação de sua tarefa?",
                                choices: [
                                    { name: "Concluido", value: "Concluida" },
                                    {
                                        name: "Em progresso",
                                        value: "Em andamento",
                                    },
                                    {
                                        name: "Não concluida",
                                        value: "Não concluido",
                                    },
                                ],
                            })
                            saveFile(Progress)
                        }
                    },
                }

                return options[type]()
            }

            verifySelect(Select)
        }
    })
}

export { Edit }
