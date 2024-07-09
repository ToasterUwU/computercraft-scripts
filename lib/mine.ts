import { getBlockNameDown, getBlockNameFront, getBlockNameUp } from "./inspect";

const veinBlacklist = ["minecraft:air", "minecraft:stone", "minecraft:deepslate", "minecraft:dirt", "minecraft:grass_block"]

function mineVeinPart(blockType: string) {
    print("Above: ", getBlockNameUp())
    if (getBlockNameUp() == blockType) {
        turtle.digUp()
        turtle.up()
        mineVeinPart(blockType)
        turtle.down()
    }

    print("Down: ", getBlockNameDown())
    if (getBlockNameDown() == blockType) {
        turtle.digDown()
        turtle.down()
        mineVeinPart(blockType)
        turtle.up()
    }

    for (let i = 0; i < 4; i++) {
        print("In Front: ", getBlockNameFront())
        if (getBlockNameFront() == blockType) {
            turtle.dig()
            turtle.forward()
            mineVeinPart(blockType)
            turtle.back()
        }
        turtle.turnLeft()
    }
}

// Will mine vein of whatever is in front of it and return to the starting position, dont use this when facing something that isnt a vein
export function mineVein() {
    let veinType = getBlockNameFront()
    if (veinType == "" || veinBlacklist.includes(veinType)) {
        return false
    }

    print("Mining Vein of type: ", veinType)

    mineVeinPart(veinType)
}
