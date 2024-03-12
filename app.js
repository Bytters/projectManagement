import { checkbox, createPrompt, input, select } from "@inquirer/prompts";
import fs from 'fs';


const answer = select({
    message: "Escolha alguma opção abaixo:",
    choices: [
        { name: "Ver Tarefa", value: "see", },
        { name: "Criar Tarefa", value: "create" }
    ]
})


const answerResolved = answer.then((async Answers => {
    // campo de variaveis
    let createTask = {};
    let fileDirectory = './data/tarefas.json'

    // create
    if (Answers == "create") {
        createTask.name = await input({ message: "Nome da tarefa?" });
        createTask.description = await input({ message: "Qual a descrição de sua tarefa?" });
        createTask.situation = await select({
            message: "Qual A situação de sua tarefa?",
            choices: [
                { name: "Concluido", value: true },
                { name: "Em progresso", value: "andamento" },
                { name: "Não concluida", value: false }
            ]
        });

        //lê o arquivo 'tarefas.json' e adiciona um novo campo
        fs.readFile(fileDirectory, 'utf-8', (err, data) => {
            if (err) return;
            const dados = JSON.parse(data);
            // dados[createTask.name] = createTask;
            const dadosAtualizados = JSON.stringify(createTask, null, 2);

            // registra as tarefas
            fs.appendFile(fileDirectory, dadosAtualizados + ',', 'utf8', (err) => {
                console.log(err || "tarefa registrado")
            })

        })
    }

    // see
    if (Answers == "see") {
        fs.readFile(fileDirectory, 'utf-8', (err, data) => {

            const Select = select({
                message: 'Selecione a tarefa',
                choices: [{
                    name: 'a', description: JSON.parse(data)
                }]
            })
            console.log(JSON.parse(data))
        })
    }
}));

