export function inspectLeft() {
    turtle.turnLeft()
    let data = turtle.inspect()
    turtle.turnRight()
    return data
}

export function inspectRight() {
    turtle.turnRight()
    let data = turtle.inspect()
    turtle.turnLeft()
    return data
}

export function inspectBehind() {
    turtle.turnLeft()
    turtle.turnLeft()
    let data = turtle.inspect()
    turtle.turnRight()
    turtle.turnRight()
    return data
}

// Inspects left, behind, and right in one go, returns the values as Object with keys
export function inspectAround() {
    turtle.turnLeft()
    let left = turtle.inspect()
    turtle.turnLeft()
    let behind = turtle.inspect()
    turtle.turnLeft()
    let right = turtle.inspect()
    turtle.turnLeft()

    return { left, behind, right }
}