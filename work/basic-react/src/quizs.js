export const quizs = [
    {
        question: "Name Jon Snow’s Direwolf.",
        options: ["Lady", "Nymeria", "Ghost", "Grey Wind"],
        answer: "Ghost"
    },

    {
        question: "Name Arya's Direwolf.",
        options: ["Shaggydog", "Grey Wind", "Lady", "Nymeria"],
        answer: "Nymeria"
    },

    {
        question: "What is Ser Davos' nickname?",
        options: ["The Onion Knight", "Blackfish", "Littlefinger", "The Halfhand"],
        answer: "The Onion Knight"
    }
];

export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
};