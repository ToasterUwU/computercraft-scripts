import { refuelIfNeeded } from "./lib/fuel"
import { inspectAround } from "./lib/inspect"

let moved = 0
function goBack() {
    turtle.turnLeft()
    turtle.turnLeft()

    for (let i = 0; i < moved; i++) {
        turtle.forward()
    }
}

function goBackIfNeeded() {
    if (turtle.getFuelLevel() < moved + 50) {
        refuelIfNeeded(turtle.getFuelLimit())
        if (turtle.getFuelLevel() < moved + 50) {
            print("Running out of fuel, aborting.")
            goBack()
            return true
        }
    }

    let inventoryFull = true
    for (let i = 1; i <= 16; i++) {
        if (turtle.getItemCount(i) == 0) {
            inventoryFull = false
            break
        }
    }
    if (inventoryFull) {
        print("Inventory is full, aborting.")
        goBack()
        return true
    }

    let lavaDetected = false
    let [forwardSuccess, forwardData] = turtle.inspect()
    if (forwardSuccess) {
        if (forwardData["name"] == "minecraft:lava") {
            lavaDetected = true
        }
    }

    let [upSuccess, upData] = turtle.inspect()
    if (upSuccess) {
        if (upData["name"] == "minecraft:lava") {
            lavaDetected = true
        }
    }

    let aroundData = inspectAround()
    let [leftSuccess, leftData] = aroundData.left
    if (leftSuccess) {
        if (leftData["name"] == "minecraft:lava") {
            lavaDetected = true
        }
    }
    let [behindSuccess, behindData] = aroundData.behind
    if (behindSuccess) {
        if (behindData["name"] == "minecraft:lava") {
            lavaDetected = true
        }
    }
    let [rightSuccess, rightData] = aroundData.right
    if (rightSuccess) {
        if (rightData["name"] == "minecraft:lava") {
            lavaDetected = true
        }
    }

    if (lavaDetected) {
        print("Lava in the way, aborting.")
        goBack()
        return true
    }

    return false
}

refuelIfNeeded(turtle.getFuelLimit())
while (turtle.detect() == false) {
    turtle.forward()
    moved = moved + 1
}

while (true) {
    if (goBackIfNeeded()) {
        break
    }

    while (turtle.detect()) {
        turtle.dig()
        sleep(0.5)
    }
    turtle.forward()
    moved = moved + 1
    turtle.digUp()
}