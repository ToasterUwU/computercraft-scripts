import { refuelIfNeeded } from "./lib/fuel"
import { containsAny } from "./lib/general"
import { getBlockNameDown, getBlockNameFront, getBlockNameUp } from "./lib/inspect"
import { mineVein } from "./lib/mine"

let moved = 0
function goBack() {
    turtle.turnLeft()
    turtle.turnLeft()

    for (let i = 0; i < moved; i++) {
        while (turtle.detect()) {
            turtle.dig()
            sleep(0.5)
        }
        turtle.forward()
    }

    turtle.turnLeft()
    turtle.turnLeft()
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

    return false
}

refuelIfNeeded(turtle.getFuelLimit())
while (turtle.detect() == false) {
    turtle.forward()
    moved = moved + 1
}

const valueables = ["emerald", "diamond", "lapis", "gold", "iron", "redstone"]

while (true) {
    if (goBackIfNeeded()) {
        break
    }

    let lavaDetected = false
    for (let height = 0; height < 2; height++) {
        if (height == 1) {
            turtle.digUp()
            turtle.up()
        }

        let upBlock = getBlockNameUp()
        if (containsAny(upBlock, valueables)) {
            mineVein(upBlock)
        } else if (upBlock == "minecraft:lava") {
            lavaDetected = true
        }

        let downBlock = getBlockNameDown()
        if (containsAny(downBlock, valueables)) {
            mineVein(downBlock)
        } else if (downBlock == "minecraft:lava") {
            lavaDetected = true
        }

        let forwardBlock = ""
        for (let i = 0; i < 4; i++) {
            forwardBlock = getBlockNameFront()
            if (containsAny(forwardBlock, valueables)) {
                mineVein(forwardBlock)
            } else if (forwardBlock == "minecraft:lava") {
                lavaDetected = true
            }

            turtle.turnLeft()
        }
        if (height == 1) {
            turtle.digDown()
            turtle.down()
        }
    }

    if (lavaDetected) {
        print("Lava detected, aborting.")
        goBack()
        break
    }

    //next section
    turtle.dig()
    turtle.forward()
    moved = moved + 1
}