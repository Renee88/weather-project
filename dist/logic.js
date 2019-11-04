class Logic {
    stringforAPI(string) {
        const brokenString = string.split(" ")
        if (brokenString.length > 1) {
            for(let word of brokenString){
                let wordIndex = 0
               let upperCased = word[0].toUpperCase() + word.slice(1)
               brokenString.splice(wordIndex,1,upperCased)
               wordIndex +=1
            }
            
            string = brokenString.join("+")
        }
        return string
    }
}