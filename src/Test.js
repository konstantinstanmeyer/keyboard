import React, { useEffect, useState, useRef } from "react";
import Keyboard from "./Keyboard";

export default function Test(){
    const word = "yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes no no no no no no no no no no no no no no no no no"
    const [blur, setBlur] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gameState, setGameState] = useState("not started");
    const inputField = document.querySelector("#typeInput");
    const keyDownTimer = useRef(null);
    const [valueHolder, setValueHolder] = useState(false)
    const [characterIndex, setCharacterIndex] = useState(0)
    const c = console.log.bind(document)
    // console.log(wordZone)

    useEffect(() => {
        const keyDownWait = 3000
        if (valueHolder == false) {
            clearTimeout(keyDownTimer.current)
            keyDownTimer.current = setTimeout(() => {
                setBlur(true);
                document.activeElement.blur()
            }, keyDownWait)
            setValueHolder(true)
        }

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
    }, [])

    function validatedWords(word){
        let lettersArray = [];
        word.split("").forEach((wordy) => {
            lettersArray.push(<span className="text-lg">{wordy}</span>)
        })
        return lettersArray;
    }


    useEffect(() => {
        if(gameState === "not started" && inputValue !== "") {
            setGameState("started")
        } else if (gameState === "started") {
            
        }
        typing();
    }, [inputValue])

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

    function typing(){
        let currentCharacter = '';
        if (inputValue.split("")[characterIndex]){
            if (inputField.length <= 1){
            currentCharacter = inputField[characterIndex]
            } else {
                currentCharacter = inputValue[characterIndex]
            }
        }
        const characters = document.querySelectorAll('span')
        c(characters[characterIndex].innerHTML)
        c(characterIndex)
        c(inputValue[characterIndex])
        c(currentCharacter)
        if(inputValue.value !== "" && currentCharacter !== ''){
            if(inputValue[characterIndex] === characters[characterIndex].innerHTML){
                characters[characterIndex].classList.add('text-green-500')
                c("correct")
                setCharacterIndex(characterIndex + 1)
            } else if(inputValue[characterIndex] === undefined){
                c('backspace handled')
                setCharacterIndex(characterIndex - 1)
                characters[characterIndex].classList.remove('text-green-500', 'text-red-500')
            } else {
                characters[characterIndex].classList.add('text-red-500')
                setCharacterIndex(characterIndex + 1)
                c("incorrect")
            }
        }
    }


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

    function started(){
        inputField.focus();
        setBlur(false)
    }

    // if (gameState == "started") started();

    return (
        <div id="test-page" className="w-1/3 h-32 ml-2 pt-3">
            <input id="typeInput" autoFocus className="z-10" onFocus={() => setBlur(false)} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <div id="test-zone" className={`overflow-hidden h-24 bg-emerald-600 rounded-lg ${blur ? 'blur-sm transition duration-300' : null} relative`} onClick={() => inputField.focus()}>
                <div id="text-area" className="flex break-words z-0 absolute">
                    <p id="word-zone" className="">{validatedWords(word)}</p>
                </div>
            </div>
            {blur ? <p className="absolute">press any button to refocus</p> : null}
            <Keyboard />
            {gameState}
        </div>
    )
}