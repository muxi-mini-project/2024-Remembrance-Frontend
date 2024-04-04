function* keyGene() {
    let count = 0
    while(1) {
        yield count++
    }
}

export const key = keyGene()