import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import Keyboard from "./Keyboard";

export default function Test({ current_user }){
    const word = "program system public early can increase restaurant performance consider people planet interest head govern general possible who point write plant state develop"
    const [blur, setBlur] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gameState, setGameState] = useState("not started");
    const inputField = document.querySelector("#typeInput");
    const keyDownTimer = useRef(null);
    const options = document.querySelector('#game-options')
    const [characterIndex, setCharacterIndex] = useState(0)
    const [errors, setErrors] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [textStyle, setTextStyle] = useState("random")
    const [displayResult, setDisplayResult] = useState(false)
    const [accuracy, setAccuracy] = useState(0)
    const [wordCount, setWordCount] = useState(25)
    const [isLoading, setIsLoading] = useState(false)
    const [wpm, setWpm] = useState("...")
    const quote = document.querySelector('#quote')
    const random = document.querySelector('#random')
    const yours = document.querySelector('#yours')
    let textTimer;
    const c = console.log.bind(document)

    useEffect(() => {
        const keyDownWait = 3000
        
        keyDownTimer.current = setTimeout(() => {
            setBlur(true);
            document.activeElement.blur()
        }, keyDownWait)

        window.addEventListener('keydown', (e) => {
            const button = document.querySelector(`#${e.code.charAt(e.code.length-1).toLowerCase()}`);
            //fix
            button.classList.remove('text-emerald-500');
            button.classList.remove('bg-sky-900');
            button.classList.add('bg-emerald-500');
            button.classList.add('text-sky-900');
            // inputField.disabled = false;
        })

        window.addEventListener('keyup', e => {
            const button = document.querySelector(`#${e.code.charAt(e.code.length-1).toLowerCase()}`);
            let focus = document.querySelector("#typeInput");
            setBlur(false);
            focus.focus();
            if(gameState === "not started") {
                keyDownTimer.current = setTimeout(() => {
                    setBlur(true);
                    document.activeElement.blur();
                }, keyDownWait)
            }
            button.classList.remove('bg-emerald-500');
            button.classList.remove('text-sky-900');
            button.classList.add('bg-sky-900');
            button.classList.add('text-emerald-500');
            clearTimeout(keyDownTimer.current)
        })

        return () => clearTimeout(keyDownTimer.current)
    }, [])

    function validatedWords(word){
        let lettersArray = [];
        word.split("").forEach((wordy) => {
            lettersArray.push(<span id={`${uuidv4()}`} className="text-2xl text-sky-900">{wordy}</span>)
        })
        return lettersArray;
    }

    useEffect(() => {
        if(gameState === "not started" && inputValue !== "") {
            setGameState("started")
        }
        if (inputValue.length >= 1){
            typing();

        }
        if(inputValue.length >= 1){
            setErrors(errors => getErrors(errors))
        }
    }, [inputValue])

    function getErrors(){
        let errors = 0;
        let spans = document.querySelectorAll('span')
        spans.forEach((span) => {
            if (span.classList.contains('text-red-500')){
                errors++;
            }
        })
        return errors;
    }

    useEffect(() => {
        let countup
        if (gameState === "started") {
            options.classList.remove("bg-sky-900")
            options.classList.add("bg-sky-900/40")
            countup = setInterval(() => {
                setTimeElapsed(seconds => seconds + 1)
            }, 1000)
        }

        if (characterIndex == word.length && current_user.hasOwnProperty('email') && gameState === "finished"){
            submitScore();
            console.log('hello')
        }

        return () => clearInterval(countup)
    }, [gameState])

    useEffect(() => {
        if (gameState === "started" && characterIndex == word.length) {
            inputField.disabled = true
            setDisplayResult(true)
            setWpm(getWpm())
            setAccuracy(getAccuracy())
            setGameState("finished")
        } 

        const spans = document.querySelectorAll('span')
        spans.forEach((span) => span.classList.remove('underline'))
        if(characterIndex !== spans.length) spans[characterIndex].classList.add('underline')
    }, [characterIndex])

    function getWpm(){
        return Math.round((((characterIndex - errors) / 5) / (timeElapsed)) * 60)
    }

    function getAccuracy(){
        return Math.round(((characterIndex - errors) / characterIndex) * 100)
    }

    // useEffect(() => {
    //     getWpm()
    // }, [timeElapsed])

    function typing(){
        const characters = document.querySelectorAll('span');

        if(inputValue[characterIndex] === characters[characterIndex].innerHTML){
            setCharacterIndex(characterIndex => characterIndex + 1)
            characters[characterIndex].classList.add('text-green-500')
            c("correct")
        } else if (inputValue[characterIndex] === undefined ){
            let characterValue = characterIndex - 1
            characters[characterValue].classList.remove('text-green-500', 'text-red-500', 'italic')
            setCharacterIndex(characterIndex => characterIndex - 1)
        } else if(inputValue[characterIndex] !== characters[characterIndex].innerHTML) {
            setCharacterIndex(characterIndex => characterIndex + 1)
            characters[characterIndex].classList.add('text-red-500')
            characters[characterIndex].classList.add('italic')
            // setErrors(errors => errors + 1)
            //change handling to listen to inputVALUE and be equivalent to the amount of span tags that are red
            c("incorrect")
        } else if (inputValue.length == 0){
            setCharacterIndex(1)
            characters[0].classList.remove('text-green-500', 'text-red-500')
        }
    }

    function submitScore(){
        console.log({
            score: wpm,
                accuracy: accuracy,
                style: textStyle,
                user_id: current_user.id
        })

        fetch('http://localhost:3000/scores', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({
                score: wpm,
                accuracy: accuracy,
                style: textStyle,
                user_id: current_user.id
            })
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    return (
        <div className="items-center h-1/2 relative">
            <div id="game-options" className="w-[37.5%] bg-sky-900 h-10 mx-auto mt-6 rounded-md flex flex-row items-center">
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 className={`text-emerald-500 text-sm font-bold text-center ml-1 w-1/4 select-none`}>words</h2>
                    <p onClick={() => setWordCount(15)} className={` ${wordCount == 15 ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>15</p>
                    <p onClick={() => setWordCount(25)} className={`${wordCount == 25 ? "text-emerald-500" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>25</p>
                    <p onClick={() => setWordCount(50)} className={`${wordCount == 50 ? "text-emerald-500" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4`}>50</p>
                </div>
                <div className="w-[2px] h-[60%] bg-emerald-500"></div>
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 onClick={() => setTextStyle("random")} id="random" className={`${textStyle == "random" ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer ml-2 text-sm font-bold text-center w-1/3`}>random</h2>
                    <p onClick={() => setTextStyle("quote")} id="quote" className={`${textStyle == "quote" ? "text-emerald-500/100" : "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/3`}>quote</p>
                    <div className="dropdown dropdown-right m-0 p-0 h-fit ml-2">
                    <label tabIndex={0} className={`btn ${textStyle == "yours" ? "text-emerald-500/100" : "text-emerald-500/40"} no-animation bg-transparent text-sm hover:bg-emerald-300 border-none m-0 p-0 hover:text-emerald-500/100 hover:bg-transparent lowercase`}>yours</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>option 1</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>option 2</a></li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="w-2/5 h-10 mx-auto mt-6 rounded-md items-center flex flex-row">
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
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{wpm}</h1>
                </div>
            </div>
            <div id="test-page" className="w-1/3 mx-auto">
                <input id="typeInput" autoComplete="off" autoFocus className="opacity-0 absolute" onFocus={() => setBlur(false)} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                {displayResult ? <div className="absolute justify-center items-center flex z-50 -top-40 left-0 w-screen h-screen bg-black/50">
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
                    <div id="test-zone" className={`h-fit justify-center flex mt-8 my-5 py-1 bg-emerald-600 rounded-lg ${blur && !isLoading ? 'blur-sm transition duration-300' : null} relative`} onClick={() => inputField.focus()}>
                        {isLoading ? <div className="h-40 w-full relative flex justify-center items-center animate-spin">
                            <img className="!blur-none w-1/4" src="https://cdn-icons-png.flaticon.com/512/7329/7329801.png"/>
                        </div> : 
                        <div id="text-area" className="flex break-words z-0">
                            <p id="word-zone" className="text-center select-none">{validatedWords(word)}</p>
                        </div>}
                    </div>
                    {blur ? <h2 className="absolute w-full text-center font-bold italic text-sky-900 text-sm -bottom-5">press any button to refocus or click text</h2> : null}
                </div>
                <Keyboard />
            </div>
            <p className="absolute bottom-20 left-12 text-xl font-bold">{gameState}</p>
        </div>
    )
}