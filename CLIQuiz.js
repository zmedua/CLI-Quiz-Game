const readline = require('readline'); //input output for CLI

const quizQA =  // Array of question objects with question, choices, and answer
[ {question: "Who is the 21st President of the United States?", choices:["George Washington", "Thomas Jefferson", "James Buchanan","Chester A. Arthur"], answer: "Chester A. Arthur"},
  {question: "Who is the 16th President of the United States?", choices:["Barack Obama", "Abraham Lincoln", "James Buchanan","Andrew Johnson"], answer: "Abraham Lincoln"},
  {question: "Who is the 1st President of the United States?", choices:["Herbert Hoover", "George Bush", "George Washington","Chester A. Arthur"], answer: "George Washington"},
  {question: "Who is the 15th President of the United States?", choices:["George Washington", "Thomas Jefferson", "James Monroe","James Buchanan"], answer: "James Buchanan"},   
  {question: "Who is the 7th President of the United States?", choices:["Andrew Jackson", "John Adams", "James Monroe","James Buchanan"], answer: "Andrew Jackson"},
  {question: "Who is the 3rd President of the United States?", choices:["George Washington", "Thomas Jefferson", "James Monroe","James Buchanan"], answer: "Thomas Jefferson"},
  {question: "Who is the 17th President of the United States?", choices:["Andrew Johnson", "Abraham Lincoln", "James Monroe","James Buchanan"], answer: "Andrew Johnson"},
  {question: "Who is the 26th President of the United States?", choices:["Theodore Roosevelt", "Abraham Lincoln", "James Monroe","James Buchanan"], answer: "Theodore Roosevelt"},
  {question: "Who is the 32nd President of the United States?", choices:["Franklin D. Roosevelt", "Abraham Lincoln", "James Monroe","James Buchanan"], answer: "Franklin D. Roosevelt"},
  {question: "Who is the 44th President of the United States?", choices:["Barack Obama", "Abraham Lincoln", "James Monroe","James Buchanan"], answer: "Barack Obama"}  
];

module.exports = quizQA;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const askQuestion = (question, choices, answer, questionNumber, timeLimit) =>{ // Returns a promise that resolves to true if the answer is correct, false otherwise
  return new Promise((resolve) => {
    console.log(`\nQuestion ${questionNumber + 1}: ${question}`);
    
    choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice}`);
  
    });
  
    console.log(` You have ${timeLimit} seconds:`);

    let answered = false;

    const timer = setTimeout(() => {                    // If time runs out before the user answers, resolve as false
        if(!answered)
        {console.log("\n Time's up!");
        answered = true;
        resolve(false);
        }
    }, timeLimit * 1000);

    const startTime = Date.now();                                   // Start the timer when the question is displayed
    rl.question('Choose an option (1-4): ', (userInput) => {
        if (answered) return;

        answered = true;
        clearTimeout(timer);

    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    
    const index = parseInt(userInput) - 1
    const selected = choices[index];
    // Time in seconds
    
    if (!selected)                                      // If the user input is invalid (not 1-4), resolve as false
    {
        console.log("Input ERROR. Please enter a number 1-4, thankyou.");
        return resolve(false);
    }

    if (selected === answer) 
    {
        console.log(`Correct! Time taken: ${timeTaken} seconds`);
        resolve(true);

    }
    else    {
        console.log(`Incorrect! The correct answer is: ${answer}. Time taken: ${timeTaken} seconds`);
        resolve(false);
    }

    });
  });
};

const beginQuiz = async () => {                 // Main function to run the quiz, iterates through questions and keeps track of score and time
    //let score = 0;
    const results = []
    const totalQuestions = quizQA.length;


    const GAME_TIME_LIMIT = 110;
    const QUESTION_TIME_LIMIT = 10;

    let gameStartTime = Date.now();

    console.log("Welcome to the CLI Quiz! Answer the following questions:");
    console.log(`Total time limit: ${GAME_TIME_LIMIT} seconds\n`);

    for (let i = 0; i < totalQuestions; i++) {                                              // Before asking each question, check if the total game time limit has been reached
        const elapsed = (Date.now() - gameStartTime) / 1000;

        if (elapsed >= GAME_TIME_LIMIT)
            {
                console.log("\n Time limit reached! THE END");
                break;
            }

        const { question, choices, answer } = quizQA[i];
        const isCorrect = await askQuestion(question, choices, answer, i, QUESTION_TIME_LIMIT);

    
        results.push(isCorrect);
    }
    const score = results.reduce((total, r) => total + (r ? 1: 0 ), 0);             // Calculate score by counting correct answers
    const percentage = (score / results.length * 100).toFixed(1);
    const totalTimeTaken =((Date.now() - gameStartTime) / 1000).toFixed(2);
    
    
    console.log('\n Done!');                                    // Display final results, including score, percentage, and total time taken
    console.log(`Score: ${score}/${totalQuestions}`);
    console.log(`percentage: ${percentage}%`);
    console.log(`Total time taken: ${totalTimeTaken} seconds`);

    rl.close();
};
rl.question("Press Enter to begin..", () => {
    beginQuiz();
});


    // Time in seconds