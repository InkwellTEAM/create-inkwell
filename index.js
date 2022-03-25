#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import gradient from "gradient-string"
import figlet from "figlet"
import { createSpinner } from "nanospinner"
import fs from "fs"
import path from "path"
import { exit } from "process"

let projectDir,
  packageName,
  version,
  author,
  keywords = [],
  license,
  main,
  toolsUsed = [],
  repository

function rest() {
  console.log(`CLI for ${chalk.blue("inkwell")} projects!`)
  console.log(`Want more functions? ${chalk.bgBlue("npm i inkwell-cli")}`)
  getData()
}

async function createPackage() {
  const spinner = createSpinner("Creating package.json...").start()

  function failed() {
    spinner.error({
      text: "An unexpected error occurred while creating project! Please try to create project again.",
    })
  }

  fs.readdir(projectDir, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(projectDir, file), (err) => {
        if (err) throw err
      })
    }
  })

  const packagejson = `
  {
    "name": "${packageName}",
    "version": "${version}",
  }
  `

  fs.appendFile(`${projectDir}/package.json`, packagejson, function (err) {
    failed()
  })

  spinner.success()
}

async function getData() {
  const answers1 = await inquirer.prompt({
    name: "project_dir",
    type: "input",
    message: "Project directory",
  })

  projectDir = answers1.project_dir

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length > 0) {
      const answerthreehalf = await inquirer.prompt({
        name: "empty_dir",
        type: "confirm",
        message:
          "Directory seems not to be empty. Do you want to delete these files?",
        default: false,
      })

      if (answerthreehalf.empty_dir === false) {
        exit(0)
      }
    }
  } else {
    try {
      fs.mkdirSync(projectDir)
    } catch (e) {
      console.log(
        chalk.bgRed(
          "An unexpected error occurred! Please try creating project again."
        )
      )
    }
  }

  const answers2 = await inquirer.prompt({
    name: "package_name",
    type: "input",
    message: "Package Name",
  })

  packageName = answers2.package_name

  const answers3 = await inquirer.prompt({
    name: "version",
    type: "input",
    message: "Version",
  })

  version = answers3.version

  const answers4 = await inquirer.prompt({
    name: "keywords",
    type: "input",
    message: "Keywords",
  })

  keywords = answers4.keywords.split(/[ ,]+/)

  const answers5 = await inquirer.prompt({
    name: "author",
    type: "input",
    message: "Author",
  })

  author = answers5.author

  const answers6 = await inquirer.prompt({
    name: "license",
    type: "list",
    message: "License",
    choices: ["ISC", "MIT", "Apache-2.0", "GNU GPLv3", "Unlicensed"],
    default() {
      return "MIT"
    },
  })

  license = answers6.license

  const answers7 = await inquirer.prompt({
    name: "main",
    type: "input",
    message: "Main",
    default() {
      return "index.js"
    },
  })

  main = answers7.main

  const answers8 = await inquirer.prompt({
    name: "repository",
    type: "input",
    message: "Link to repository",
  })

  repository = answers8.repository

  createPackage()
}

async function start() {
  await figlet("Inkwell CLI", (err, data) => {
    console.log(gradient.mind.multiline(data))
    rest()
  })
}

console.clear()
start()
