#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import gradient from "gradient-string"
import figlet from "figlet"
import { createSpinner } from "nanospinner"

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function intro() {
  await figlet("Inkwell CLI", (err, data) => {
    console.log(gradient.mind.multiline(data))
  })
}

await intro().then(() => {
  console.log("test")
})
