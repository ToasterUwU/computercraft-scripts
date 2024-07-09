export function refuelIfNeeded(required: number = 0): boolean {
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