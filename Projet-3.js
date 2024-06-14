const prompt = require("prompt-sync")()
let attaques = [
    {
        name: "Frappe Rapide",
        puissance: 10,
        precision: 1,
    },
    {
        name: "Soin léger",
        puissance: -15,
        precision: 2,
    },
    {
        name: "Coup puissant",
        puissance: 20,
        precision: 2,
    },
    {
        name: "Frappe Dévastatrice",
        puissance: 30,
        precision: 3,
    },
]
let playerOne =
{
    name: "Guerrier du Feu",
    pvMax: 100,
    pv: 100,
    attaque: attaques
}
let ia =
{
    name: "Sombre Lutin",
    pvMax: 100,
    pv: 100,
    attaque: attaques
}
console.log("\u001b[" + 32 + "m" + "Bienvenue, tu vas assister à un combat Légendaire ! Le premier à O pv va sombrer...");
let game = prompt("Voulez-vous jouer ? Oui (O) Non (N)").toUpperCase()
if (game == "O") {
    function randomize(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    function choice() {
        for (let i = 0; i < playerOne.attaque.length; i++) {
            console.log(i + " " + playerOne.attaque[i].name);
        }
        let choice = parseInt(prompt("Veuillez choisir votre attaque : "))
        while (choice != 0 && choice != 1 && choice != 2 && choice != 3) {
            choice = parseInt(prompt("Choisi ton attaque et fais pas chier : 0, 1, 2, 3 : "))
        }
        return playerOne.attaque[choice];
    }
    function atk(atks, launcher, opponent) {
        if (randomize(0, atks.precision) === atks.precision) {
            console.log(`${launcher.name} lance ${atks.name} et inflige ${atks.puissance} dégâts\n`);
            if (atks.puissance < 0) {
                launcher.pv -= atks.puissance
            } else {
                opponent.pv -= atks.puissance
                console.log(`${opponent.name} subit ${atks.puissance} dégâts, il lui reste ${opponent.pv}PV\n`);
            }

            console.log(`${opponent.name} a maintenant ${opponent.pv} PV\n`);
            console.log(`${launcher.name} a maintenant ${launcher.pv} PV\n`);
        } else {
            console.log("T'as fail");
        }
    }
    function playia() {
        let iachoice = randomize(0, ia.attaque.length - 1)
        return ia.attaque[iachoice]
    }
    while (playerOne.pv > 0 || ia.pv > 0) {
        let atkplay = choice()
        atk(atkplay, playerOne, ia)

        let atkia = playia()
        atk(atkia, ia, playerOne)
        if (playerOne.pv <= 0) {
            console.log("T'es naze");
            break
        } else if (ia.pv <= 0) {
            console.log("GG T'es trop fort");
            break
        }
    }
} else {
    console.log("T'abuuuuses");
}
