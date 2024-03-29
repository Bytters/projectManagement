import { checkbox, createPrompt, input, select } from "@inquirer/prompts"
import { Create } from "./utils/create/create.js"
import { See } from "./utils/see/see.js"
import { Edit } from "./utils/edit/edit.js"
import { Delete } from "./utils/delete/delete.js"
import fs from "fs"

const answer = select({
    message: "Escolha alguma opção abaixo:",
    choices: [
        { name: "Ver Tarefa", value: "see" },
        { name: "Criar Tarefa", value: "create" },
        { name: "Editar Tarefa", value: "edit" },
        { name: "Deletar Tarefa", value: "delete" },
    ],
})

const answerResolved = answer.then(async (Answers) => {
    // campo de variaveis
    let createTask = {}
    let fileDirectory = "./data/tarefas.json"
    if (!fs.existsSync(fileDirectory)) {
        fs.writeFile(fileDirectory, "[]", "utf-8", (err) => {
            return
        })
    }

    switch (Answers) {
        case "create":
            Create(Answers, createTask, fileDirectory)
            break
        case "see":
            See(Answers, fileDirectory)
            break
        case "edit":
            Edit(fileDirectory, createTask)
            break
        case "delete":
            Delete(fileDirectory, createTask)
            break
        default:
            console.log("Escolha alguma opção")
            break
    }
})
