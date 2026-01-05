export const gameConfig = {
    playerName: "My Love", // Default name, can be changed
    theme: "romantic",
    steps: [
        {
            id: 1,
            type: 'click',
            instruction: "💌",
            buttonText: "Start",
            message: "Hey… before we begin, I want you to know this is just for you.",
            icon: "❤️"
        },
        {
            id: 2,
            type: 'hover', // Acts as "Hold"
            instruction: "Hold the heart",
            message: "Every little moment with you feels a bit special.",
            icon: "💗"
        },
        {
            id: 3,
            type: 'choice',
            instruction: "What makes you smile?",
            choices: [
                { text: "Warmth", icon: "☀️" },
                { text: "Laughter", icon: "😄" },
                { text: "Us", icon: "👩‍❤️‍👨" }
            ],
            message: "Some people make the world softer just by being in it… you do.",
            icon: "🌸"
        },
        {
            id: 4,
            type: 'timer',
            instruction: "Feel the moment...",
            duration: 4000,
            message: "The more time passes, the more I realize how important you are to me.",
            icon: "✨"
        },
        {
            id: 5,
            type: 'slider',
            instruction: "Slide to unlock",
            message: "There’s something I’ve been meaning to tell you…",
            icon: "💞"
        },
        {
            id: 6,
            type: 'reveal',
            instruction: "Open",
            buttonText: "Read Letter",
            message: "{playerName}, you’re not just special…\n\nYou’re the reason this little game exists.",
            icon: "💖",
            isFinal: true
        }
    ]
};
