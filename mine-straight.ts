function refuelIfNeeded(required: number = 0): boolean {
    print("Current fuel: ", turtle.getFuelLevel(), "/", tostring(turtle.getFuelLimit()))
    print("Required fuel: ", required)

    if (turtle.getFuelLevel() > required) {
        print("Already at required Fuel Level")
        return true
    }

    let i = 1
    turtle.select(i)

    while (turtle.getFuelLevel() < required) {
        while (turtle.refuel(1) == false) {
            if (i == 16) {
                print("No fuel in inventory, cant refuel")
                return false
            }

            if (turtle.getFuelLevel() == turtle.getFuelLimit()) {
                print("Fueltank is full")
                return false
            }

            i++
            turtle.select(i)
        }
        print("Refueled once, current level is ", turtle.getFuelLevel(), "/", turtle.getFuelLimit())
    }
    print("Done refueling")
    return true
}

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

    let functions = [turtle.inspect, turtle.inspectUp, turtle.inspectDown]
    functions.forEach(func => {
        let [success, data] = func()
        if (success) {
            if (data["name"] == "minecraft:lava") {
                print("Lava in the way, aborting.")
                goBack()
                return true
            }
        }
    });

    return false
}

refuelIfNeeded(turtle.getFuelLimit())
while (turtle.detect() == false) {
    turtle.forward()
    moved = moved + 1
}

while (goBackIfNeeded() == false) {
    turtle.dig()
    turtle.forward()
    moved = moved + 1
    turtle.digUp()
}