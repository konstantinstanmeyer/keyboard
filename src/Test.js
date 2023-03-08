import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import Keyboard from "./Keyboard";

export default function Test({ current_user }){
    const [word, setWord] = useState("");
    const [blur, setBlur] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gameState, setGameState] = useState("not started");
    const inputField = document.querySelector("#input1");
    const keyDownTimer = useRef(null);
    const [characterIndex, setCharacterIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [textStyle, setTextStyle] = useState("random");
    const [displayResult, setDisplayResult] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [wordCount, setWordCount] = useState(25);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedOnce, setLoadedOnce] = useState(false);
    const [showKeyboard, setShowKeyBoard] = useState(true);
    const [showWpm, setShowWpm] = useState(true);
    const [wpm, setWpm] = useState(0);
    const [language, setLanguage] = useState("en");
    const c = console.log.bind(document);
    // const activeElement = document.activeElement;

    useEffect(() => {
        const keyDownWait = 3000
        
        keyDownTimer.current = setTimeout(() => {
            document.querySelector('#input2').focus();
            setBlur(true);
            c("blur1");
        }, keyDownWait)

        window.addEventListener('keydown', (e) => {
            const button = document.querySelector(`#${e.code.charAt(e.code.length-1).toLowerCase()}`);
            button.classList.remove('text-emerald-500');
            button.classList.remove('bg-sky-900');
            button.classList.add('bg-emerald-500');
            button.classList.add('text-sky-900');
            setBlur(false);
            clearTimeout(keyDownTimer);
        })

        window.addEventListener('keyup', e => {
            const button = document.querySelector(`#${e.code.charAt(e.code.length-1).toLowerCase()}`);
            button.classList.remove('bg-emerald-500');
            button.classList.remove('text-sky-900');
            button.classList.add('bg-sky-900');
            button.classList.add('text-emerald-500');
            document.querySelector('#input1').focus();
            clearTimeout(keyDownTimer);
        })

        return () => clearTimeout(keyDownTimer);
    }, [])

    function validatedWords(word){
        let lettersArray = [];
        word.split("").forEach((wordy) => {
            lettersArray.push(<span id={`${uuidv4()}`} className="text-2xl text-sky-900">{wordy}</span>);
        });
        return lettersArray;
    }

    useEffect(() => {
        if(gameState === "not started" && inputValue !== "") {
            setGameState("started");
        }
        if (inputValue.length >= 1){
            typing();
        }
        if(inputValue.length >= 1){
            setErrors(getErrors());
            // fixErrors()
        }
    }, [inputValue])

    function fixErrors(){
        let spans = document.querySelectorAll('span');
        for (let i=0; i<spans.length; i++){
            if(i < characterIndex && !spans[i].classList.contains('text-red-500') || i < characterIndex - 1 && !spans[i].classList.contains('text-red-500')){
                spans[i].classList.add('text-green-500');
            } else if (i > characterIndex - 1){
                spans[i].classList.remove('text-green-500', 'text-red-500');
            }
        }
    }

    function getErrors(){
        let errors = 0;
        let spans = document.querySelectorAll('span');
        spans.forEach((span) => {
            if (span.classList.contains('text-red-500')){
                errors++;
            }
        })
        return errors;
    }

    useEffect(() => {
        if(textStyle == "random"){
            setIsLoading(true);
            fetch(`http://localhost:3000/words/${wordCount}`)
            .then(r => r.json())
            .then(r => {
                setWord(r[0]);
                setIsLoading(false);
                clearTimeout(keyDownTimer.current);
                setLoadedOnce(true);
            })
        }

        let focus = document.querySelector("#input1");
        focus.focus();
    }, [wordCount])

    function resetGame(){
        setGameState("not started");
        setAccuracy(0);
        setWpm(0);
        setTimeElapsed(0);
        setErrors(0);
        setCharacterIndex(0);
        setInputValue("");
        inputField.focus();

        if (textStyle === "bacon"){
            setIsLoading(true);
            fetch('http://localhost:3000/bacon')
            .then(r => r.json())
            .then(data => {
                data[0] = data[0].slice(2);
                setWord(data.slice(0,25).join(" ") + " ");
                setIsLoading(false);
            })  
        } else if (textStyle === "random"){
            setIsLoading(true);
            fetch(`http://localhost:3000/words/${wordCount}`)
            .then(r => r.json())
            .then(r => {
                setWord(r[0]);
                setIsLoading(false);
                clearTimeout(keyDownTimer.current);
                setLoadedOnce(true);
            })
        } else if (textStyle === "quote"){
            setIsLoading(true);
            fetch(`http://localhost:3000/quote/${language}`)
            .then(r => r.json())
            .then(data => {
                setWord(data.results[0].quote.split(" ").slice(0, 25).join(" ") + " ");
                setIsLoading(false);
            })
        }
    }

    useEffect(() => {
        let countup;
        if (gameState === "started") {
            console.log("started");
            countup = setInterval(() => {
                setTimeElapsed(seconds => seconds + 1);
            }, 1000);
        } else if (gameState === "not started" && loadedOnce){
            inputField.disabled = false
        }
        
        if (characterIndex == word.length - 1 && current_user.hasOwnProperty('email') && gameState === "finished"){
            submitScore();
        }

        return () => clearInterval(countup);
    }, [gameState])

    useEffect(() => {
        if (timeElapsed >= 1){
            setWpm(getWpm());
        }
    }, [timeElapsed])

    useEffect(() => {
        if (gameState === "started" && characterIndex == word.length - 1) {
            inputField.disabled = true;
            setDisplayResult(true);
            setWpm(getWpm());
            setAccuracy(getAccuracy());
            setGameState("finished");
            console.log("done");
        }

        const spans = document.querySelectorAll('span');

        spans.forEach((span) => span.classList.remove('underline'));

        if(characterIndex !== spans.length) spans[characterIndex].classList.add('underline');
    }, [characterIndex])

    function getWpm(){
        return Math.round((((characterIndex - errors) / 5) / (timeElapsed)) * 60);
    }

    function getAccuracy(){
        return Math.round(((characterIndex - errors) / characterIndex) * 100);
    }

    function typing(){
        const characters = document.querySelectorAll('span');

        if(inputValue[characterIndex] === characters[characterIndex].innerHTML){
            setCharacterIndex(characterIndex => characterIndex + 1);
            characters[characterIndex].classList.add('text-green-500');
            c("correct");
        } else if (inputValue[characterIndex] === undefined ){
            let characterValue = characterIndex - 1;
            characters[characterValue].classList.remove('text-green-500', 'text-red-500', 'italic');
            setCharacterIndex(characterIndex => characterIndex - 1);
        } else if(inputValue[characterIndex] !== characters[characterIndex].innerHTML) {
            setCharacterIndex(characterIndex => characterIndex + 1);
            characters[characterIndex].classList.add('text-red-500');
            characters[characterIndex].classList.add('italic');
            c("incorrect");
        } else if (inputValue.length == 0){
            setCharacterIndex(1);
            characters[0].classList.remove('text-green-500', 'text-red-500');
        }
    }

    function submitScore(){
        // console.log({
        //     score: wpm,
        //     accuracy: accuracy,
        //     style: textStyle,
        //     user_id: current_user.id
        // })

        fetch('http://localhost:3000/score', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score: wpm,
                accuracy: accuracy,
                style: textStyle,
                user_id: current_user.id,
                word_length: wordCount
            })
        })
        .then(r => r.json())
        .then(data => {
            c('score submitted successfully!');
        })
    }

    useEffect(() => {
        if(textStyle === "bacon"){
            setIsLoading(true);
            fetch('http://localhost:3000/bacon')
            .then(r => r.json())
            .then(data => {
                data[0] = data[0].slice(2);
                setWord(data.slice(0,25).join(" ") + " ");
                setIsLoading(false);
            })
        } else if (textStyle === "random" && loadedOnce){
            setIsLoading(true);
            fetch(`http://localhost:3000/words/${wordCount}`)
            .then(r => r.json())
            .then(r => {
                setWord(r[0]);
                setIsLoading(false);
            })
        } else if (textStyle == "quote") {
            setIsLoading(true);
            fetch(`http://localhost:3000/quote/${language}`)
            .then(r => r.json())
            .then(data => {
                setWord(data.results[0].quote.split(" ").slice(0, 25).join(" ") + " ");
                setIsLoading(false);
            })
        }
    }, [textStyle])

    useEffect(() => {
        if (textStyle === "quote"){
            setIsLoading(true);
            fetch(`http://localhost:3000/quote/${language}`)
            .then(r => r.json())
            .then(data => {
                setWord(data.results[0].quote.split(" ").slice(0, 25).join(" ") + " ");
                setIsLoading(false);
            })
            setBlur(false);
        }
    }, [language])

    if (textStyle === "bacon" && wordCount !== 25){
        setWordCount(25);
    } else if (textStyle === "quote" && wordCount !== 25){
        setWordCount(25);
    }

    if (gameState === "started" && blur === true){
        setBlur(false);
        inputField.focus();
    }

    return (
        <div className="items-center h-1/2 relative">
            <input id="input2" className="absolute opacity-0"/>
            <div id="game-options" className={`w-[37.5%] ${gameState === "started" ? "bg-sky-900/40" : "bg-sky-900/100"} h-10 mx-auto mt-6 rounded-md flex flex-row items-center shadow-lg`}>
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 className={`text-emerald-500 text-sm font-bold text-center ml-1 w-1/4 select-none`}>words</h2>
                    <p id="15-button" onClick={gameState === "started" || gameState === "finished" ? null : () => setWordCount(15)} className={` ${wordCount == 15 ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>15</p>
                    <p id="30-button" onClick={gameState === "started" || gameState === "finished" ? null : () => setWordCount(25)} className={`${wordCount == 25 ? "text-emerald-500" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>25</p>
                    <p id="50-button" onClick={gameState === "started" || gameState === "finished" ? null : () => setWordCount(50)} className={`${wordCount == 50 ? "text-emerald-500" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>50</p>
                </div>
                <div className="w-[2px] h-[60%] bg-emerald-500"></div>
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 onClick={gameState === "started" || gameState === "finished" ? null : () => setTextStyle("random")} id="random" className={`${textStyle == "random" ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer ml-2 text-sm font-bold text-center w-1/3`}>random</h2>
                    <p onClick={gameState === "started" || gameState === "finished" ? null : () => setTextStyle("quote")} id="quote" className={`${textStyle == "quote" ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/3`}>quote</p>
                    <div className="dropdown dropdown-right m-0 p-0 h-fit ml-2">
                    <p onClick={gameState === "started" || gameState === "finished" ? null : () => setTextStyle("bacon")} id="bacon" className={`${textStyle == "bacon" ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/3`}>bacon</p>
                </div>
                </div>
            </div>
            <div className="w-2/5 h-10 mx-auto mt-6 rounded-md items-center flex flex-row relative">
                {textStyle === "quote" ? <div className="absolute dropdown dropdown-hover -right-28 -top-14">
                    <label tabIndex={0} className="btn m-1 bg-sky-900 hover:bg-sky-600 text-emerald-500 border-none">Language</label>
                    <ul tabIndex={0} className="dropdown-content bg-sky-900 menu p-2 shadow rounded-box w-52">
                        <li onClick={() => setLanguage("en")} className={`${language === "en" ? "bg-sky-600" : "bg-sky-900"} text-md hover:bg-sky-600 text-emerald-500 font-bold`}><a>English</a></li>
                        <li onClick={() => setLanguage("es")} className={`${language === "es" ? "bg-sky-600" : "bg-sky-900"} text-md hover:bg-sky-600 text-emerald-500 font-bold`}><a>Español</a></li>
                        <li onClick={() => setLanguage("fr")} className={`${language === "fr" ? "bg-sky-600" : "bg-sky-900"} text-md hover:bg-sky-600 text-emerald-500 font-bold`}><a>Français</a></li>
                        <li onClick={() => setLanguage("de")} className={`${language === "de" ? "bg-sky-600" : "bg-sky-900"} text-md hover:bg-sky-600 text-emerald-500 font-bold`}><a>Deutsch</a></li>
                        <li onClick={() => setLanguage("it")} className={`${language === "it" ? "bg-sky-600" : "bg-sky-900"} text-md hover:bg-sky-600 text-emerald-500 font-bold`}><a>Italiano</a></li>
                    </ul>
                </div>: null}
                <div className="flex flex-col justify-center w-1/3 h-full">
                    <h2 className="mx-auto text-sky-900/70 font-bold select-none">ERRORS</h2>
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{errors}</h1>
                </div>
                <div className="w-[2px] h-[70%] bg-sky-900"></div>
                <div className="flex flex-col justify-center w-1/3 h-full">
                    <h2 className="mx-auto text-sky-900/70 font-bold select-none">TIME ELAPSED</h2>
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{Math.floor(timeElapsed / 60)}:{timeElapsed % 60 > 9 ? timeElapsed % 60 : "0" + timeElapsed % 60}</h1>
                </div>
                <div className="w-[2px] h-[70%] bg-sky-900"></div>
                <div className="flex flex-col justify-center w-1/3 h-full">
                    <h2 className="mx-auto text-sky-900/70 font-bold select-none">WPM</h2>
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{showWpm && gameState === "not started" || showWpm && gameState === "finished" ? wpm : "..."}</h1>
                </div>
            </div> 
                <input id="input1" autoComplete="off" autoFocus className="opacity-0 absolute" onFocus={() => setBlur(false)} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <div id="test-page" className="w-1/3 mx-auto">
                {displayResult ? <div className="fixed justify-center items-center flex z-50 top-0 left-0 w-full h-screen bg-black/50">
                    <div className="w-1/3 h-1/3 bg-emerald-500 rounded-lg flex flex-col relative">
                        <div className="w-full flex flex-col mt-3 items-center py-4 h-[37%]">
                            <p className="w-full text-center text-2xl font-bold pt-1 text-sky-900">GAME SUMMARY: <span className="text-lg">{timeElapsed}s elapsed</span></p>
                            <p className="text-sky-900"><strong>game-mode: </strong>{textStyle}</p>
                        </div>
                        <div className="w-full flex flex-row h-[15%] items-center pb-5">
                            <p className="w-1/3 text-xl text-center text-sky-900 font-bold underline underline-offset-8">errors</p>
                            <p className="w-1/3 text-xl text-center text-sky-900 font-bold underline underline-offset-8">wpm</p>
                            <p className="w-1/3 text-xl text-center text-sky-900 font-bold underline underline-offset-8">accuracy</p>
                        </div>
                        <div className="w-full flex flex-row h-[25%]">
                            <p className="w-1/3 text-5xl font-bold text-sky-900 text-center">{errors}</p>
                            <p className="w-1/3 text-5xl font-bold text-sky-900 text-center">{wpm}</p>
                            <p className="w-1/3 text-5xl font-bold text-sky-900 text-center">{accuracy}%</p>
                        </div>
                        <p className="w-full text-center font-bold mb-3 text-sky-900">great job!</p>
                        <button onClick={() => setDisplayResult(false)} className="absolute right-3 top-[0.3rem] text-4xl rotate-45 text-sky-900">+</button>
                    </div>
                </div> : null}
                <div className="relative flex flex-col justify-center mb-10">
                    <div id="test-zone" className={`shadow-xl h-fit justify-center flex mt-8 my-5 py-1 bg-emerald-600 px-5 min-h-[4rem] rounded-lg ${blur && !isLoading && gameState !== "started" ? 'blur-sm transition duration-300' : '!blur-none'} relative`} onClick={() => inputField.focus()}>
                        {isLoading ? <div className="h-32 w-full relative flex justify-center items-center animate-spin">
                            <img className="!blur-none w-1/4" src="https://cdn-icons-png.flaticon.com/512/7329/7329801.png"/>
                        </div> : 
                        <div id="text-area" className="flex break-words z-0">
                            <p id="word-zone" className="text-center select-none">{validatedWords(word)}</p>
                        </div>}
                    </div>
                    {blur ? <h2 className="absolute w-full text-center font-bold italic text-sky-900 text-xs -bottom-[0.15rem]">press any button or click text to refocus</h2> : null}
                    <h2 onClick={() => resetGame()} className="absolute w-full text-center font-bold italic text-sky-900 text-sm -bottom-5 hover:cursor-pointer">click to reset</h2>
                </div>
                {showKeyboard ? <Keyboard gameState={gameState} /> : null}
                <div className="flex flex-row w-fit mx-auto h-10 mt-4">
                    <p onClick={() => setShowKeyBoard(showKeyboard => !showKeyboard)} className={`mx-4 text-lg w-fit text-sky-900 hover:cursor-pointer ${showKeyboard ? null : "line-through"}`}>keyboard</p>
                    <p onClick={() => setShowWpm(showWpm => !showWpm)} className={`mx-4 text-lg w-fit hover:cursor-pointer text-sky-900 ${showWpm ? null : "line-through"}`}>wpm</p>
                </div>
            </div>
        </div>
    );
}