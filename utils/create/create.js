import { input, select } from "@inquirer/prompts"
import fs from "fs"

async function Create(Ans, task, file) {
    task.name = await input({ message: "Nome da tarefa?" })
    task.description = await input({
        message: "Qual a descrição de sua tarefa?",
    })
    task.value = await select({
        message: "Qual A situação de sua tarefa?",
        choices: [
            { name: "Concluido", value: "Concluida" },
            { name: "Em progresso", value: "Em andamento" },
            { name: "Não concluida", value: "Não concluido" },
        ],
    })

    //lê o arquivo 'tarefas.json' e adiciona um novo campo
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) return

        const dados = JSON.parse(data) // converte para objeto JS
        dados.push(task) // adiciona a tarefa para o array do JSON
        const dadosAtualizados = JSON.stringify(dados, null, 2) // converte para JSON

        // cria um novo arquivo
        fs.writeFile(file, dadosAtualizados, "utf8", (err) => {
            console.log(err || "tarefa registrado")
        })
    })
}

export { Create }
