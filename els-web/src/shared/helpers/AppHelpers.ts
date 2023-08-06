export class StringHelper {
    static getRandomString(input: string[]): string {
        let randomIndex = Math.floor(Math.random() * input.length); // get a random index between 0 and imgs.length - 1
        return input[randomIndex]; // get the element at the random index
    }
}