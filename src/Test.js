import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import Keyboard from "./Keyboard";

export default function Test(){
    const word = "program system public early can increase restaurant performance consider people planet interest head govern general possible who point write plant state develop"
    const [blur, setBlur] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gameState, setGameState] = useState("not started");
    const inputField = document.querySelector("#typeInput");
    const keyDownTimer = useRef(null);
    const options = document.querySelector('#game-options')
    const [characterIndex, setCharacterIndex] = useState(0)
    const [errors, setErrors] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [textStyle, setTextStyle] = useState("random")
    const [accuracy, setAccuracy] = useState(0)
    const [wpm, setWpm] = useState(0)
    const quote = document.querySelector('#quote')
    const random = document.querySelector('#random')
    const yours = document.querySelector('#yours')
    let textTimer;
    const c = console.log.bind(document)

    useEffect(() => {
        if (textStyle == "random") {
            
        } else if( textStyle == "quote") {
            
        } else if(textStyle == "yours"){

        }
    }, [textStyle])

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
            clearTimeout(keyDownTimer.current)
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
        })

        return () => clearTimeout(keyDownTimer.current)
    }, [])

    function validatedWords(word){
        let lettersArray = [];
        word.split("").forEach((wordy) => {
            lettersArray.push(<span id={`${uuidv4()}`} className="text-2xl">{wordy}</span>)
        })
        return lettersArray;
    }

    useEffect(() => {
        if(gameState === "not started" && inputValue !== "") {
            setGameState("started")
        } else if (gameState === "started") {
            
        }
        if (inputValue.length >= 1){
            typing();
        } else if(inputValue.length == word.length){
            inputField.disable = "true"
        }

        if(inputValue.length >= 1){
            setErrors(errors => getErrors(errors))
        }
    }, [inputValue])

    function timer(){
        if(timeLeft > 0){
            setTimeLeft(timeLeft => timeLeft - 1)
        } else {
            clearInterval(textTimer);
            console.log("no")
        }
    }

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
        if (gameState === "started") {
            options.classList.remove("bg-sky-900")
            options.classList.add("bg-sky-900/40")
            textTimer = setInterval(timer(), 1000)
        }
    }, [gameState])

    //code for id'd and iterated word div's/pre p-tag switch

    // function createWords(words, wordIndex){
    //     return(
    //         <div key={wordIndex} id={`word-${wordIndex}`} className="pl-2 h-8">
    //             {iterate(words)}
    //         </div>
    //     )
    // }

    // function iterate(word){
    //     let letters = [];
    //     for (let i = 0; i < word.length; i++) {
    //         letters.push(<letter key={uuid()} id={`letter-${i}`} className="text-2xl font-mono">{word[i]}</letter>);
    //     }
    //     return letters;
    // }

    // function iterateWords(words){
    //     let wordsList = [];
    //     for (let i = 0; i < words.length; i++){
    //         wordsList.push(createWords(words[i], i));
    //     }
    //     return wordsList;
    // }

    // if (inputValue.length > 0) console.log(inputField.value.split("")[0])

    // useEffect(() => {
    //     let characters = document.querySelectorAll('span')
    //     if (inputValue[characterIndex] === undefined){
    //         characters[characterIndex].classList.remove('text-green-500', 'text-red-500')
    //     }
    //     c(characterIndex)
    // }, [characterIndex])

    function typing(){
        const characters = document.querySelectorAll('span');

        // c(characters[characterIndex].innerHTML);
        // c(inputValue[characterIndex]);
        // c(characterIndex);

        if(inputValue[characterIndex] === characters[characterIndex].innerHTML){
            setCharacterIndex(characterIndex => characterIndex + 1)
            characters[characterIndex].classList.add('text-green-500')
            c("correct")
        } else if (inputValue[characterIndex] === undefined ){
            let characterValue = characterIndex - 1
            characters[characterValue].classList.remove('text-green-500', 'text-red-500', 'underline')
            setCharacterIndex(characterIndex => characterIndex - 1)
        } else if(inputValue[characterIndex] !== characters[characterIndex].innerHTML) {
            setCharacterIndex(characterIndex => characterIndex + 1)
            characters[characterIndex].classList.add('text-red-500')
            characters[characterIndex].classList.add('underline')
            // setErrors(errors => errors + 1)
            //change handling to listen to inputVALUE and be equivalent to the amount of span tags that are red
            c("incorrect")
        } else if (inputValue.length == 0){
            setCharacterIndex(1)
            characters[0].classList.remove('text-green-500', 'text-red-500')
        }
    }

    // else if(inputValue[characterIndex] === undefined){
    //     c('backspace handled')
    //     setCharacterIndex(characterIndex - 1)
    //     characters[characterIndex].classList.remove('text-green-500', 'text-red-500')
    // }


    // window.scrollY + document.querySelector('#elementId').getBoundingClientRect().top is for y or top coordinate
    // window.scrollX + document.querySelector('#elementId').getBoundingClientRect().left is for x or left coordinate


    // window.addEventListener('keydown', ({code}) => {
    //     //fix
    //     let button = document.querySelector(`#${code.charAt(code.length-1).toLowerCase()}`);
    //     inputField.disabled = false;
    //     button.classList.remove('text-emerald-500');
    //     button.classList.remove('bg-sky-900');
    //     button.classList.add('bg-emerald-500');
    //     button.classList.add('text-sky-900');
    //     console.log(1);
    // })

    // function validateInput(input){
    //     let master = words
    //     if(input !== ""){
    //         switch(input){
    //             case input.length == 1 && input.charAt(input.length -1) !== " ":
    //                 input == master[0][0] ? null : null
                    
    //                 break;
    //             case input.length == 2 && input.charAt(input.length - 1) !== " ":
    //                 input

    //                 break;
    //             // case input.charAt(-1) === " "
    //         }
    //     }
    // }

    // if (gameState == "started") started();

    return (
        <div className="items-center h-1/2 relative">
            <div id="game-options" className="w-[37.5%] bg-sky-900 h-10 mx-auto mt-6 rounded-md flex flex-row items-center">
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 className="text-emerald-500 text-sm font-bold text-center ml-1 w-1/4 select-none">words</h2>
                    <p className="text-emerald-500/40 hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4">15</p>
                    <p className="text-emerald-500/40 hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4">25</p>
                    <p className="text-emerald-500/40 hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/4">50</p>
                </div>
                <div className="w-[2px] h-[60%] bg-emerald-500"></div>
                <div className="w-1/2 h-full flex flex-row items-center">
                    <h2 onClick={() => setTextStyle("random")} id="random" className="text-emerald-500/40 hover:text-emerald-500/100 hover:cursor-pointer ml-2 text-sm font-bold text-center w-1/3">random</h2>
                    <p id="quote" className="text-emerald-500/40 hover:text-emerald-500/100 hover:cursor-pointer text-sm font-bold text-center w-1/3">quote</p>
                    <div className="dropdown dropdown-right m-0 p-0 h-fit ml-2">
                    <label tabIndex={0} className="btn text-emerald-500/40 no-animation bg-transparent text-sm hover:bg-emerald-300 border-none m-0 p-0 hover:text-emerald-500/100 hover:bg-transparent lowercase">yours</label>
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
                    <h2 className="mx-auto text-sky-900/70 font-bold select-none">TIME REMAINING</h2>
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{timeLeft}</h1>
                </div>
                <div className="w-[2px] h-[70%] bg-sky-900"></div>
                <div className="flex flex-col justify-center w-1/3 h-full">
                    <h2 className="mx-auto text-sky-900/70 font-bold select-none">WPM</h2>
                    <h1 className="mx-auto text-sky-900/70 font-bold select-none">{wpm}</h1>
                </div>
            </div>
            <div id="test-page" className="w-1/3 mx-auto relative">
                <input id="typeInput" autoComplete="off" autoFocus className="opacity-0 absolute" onFocus={() => setBlur(false)} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <div className="relative flex flex-col justify-center mb-10">
                    <div id="test-zone" className={`h-fit justify-center flex mt-8 my-5 py-1 bg-emerald-600 rounded-lg ${blur ? 'blur-sm transition duration-300' : null} relative`} onClick={() => inputField.focus()}>
                        <div id="text-area" className="flex break-words z-0">
                            <p id="word-zone" className="text-center select-none">{validatedWords(word)}</p>
                        </div>
                    </div>
                    {blur ? <h2 className="absolute text-sm -bottom-5">press any button to refocus or click text</h2> : null}
                </div>
                <Keyboard />
            </div>
            <p className="absolute bottom-20 left-12 text-xl font-bold">{gameState}</p>
        </div>
    )
}