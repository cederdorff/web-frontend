import Congrats from "./congrats.js";
import race from "./race.js";
import WUClass from "./WUClass.js";

function initCongrats() {
    const wuClass = new WUClass("WU-E21s", "Favorite Web Dev Class");
    const congrats = new Congrats(`
        Dear Web Developers,

        Congratulations on the result of your hard work! 

        Unfortunately, I'm not able to attend today's graduation.
        I really wanted to be there and gratulate you in person.

        Many of you were a part of the first big Frontend class 
        on Multimedia Design. I'm honoured to have been a part of
        your journey. And I'm grateful you helped me to prove the
        importance of programming (and JavaScript, of course 💁🏼‍♂️). 
        I'm not lying when I say you made a difference and were a
        part of a great change. Thank you for being you!

        You should all be incredibly proud of yourselves and the
        accomplishments you have achieved. Also, be proud of the 
        survival of 1000s of slides, bad JavaScript jokes, too 
        many GitHub repositories, cheesy theme introductions and 
        energized morning music videos. You made it! 

        Once again, congratulations to each and every one of you.
        Remember to celebrate this milestone. And when you are 
        done, celebrate even more. You deserve it 🎉  

        I wish you all the best of luck in the next chapter of 
        your journey. The world is waiting for you, and I have 
        no doubt that you will all go on to do great things.

        Thank you 🙏🏼

        RACE;
    `);

    race.says(wuClass, congrats);
    race.codeEveryDay();
}

initCongrats();
