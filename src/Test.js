import React, { useEffect, useState } from "react";
import uuid from 'react-uuid';
import Keyboard from "./Keyboard";

export default function Test(){
    const words = ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no", "no"];
    const [blur, setBlur] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gameState, setGameState] = useState("not started")
    const inputField = document.querySelector("#typeInput");
    const [keyDown, setKeyDown] = useState(0);

    useEffect(() => {
        if(gameState === "not started" && inputValue !== "") {
            setGameState("started")
        } else if (gameState === "started") {
            
        }
    }, [inputValue])

    function createWords(words, wordIndex){
        return(
            <div key={wordIndex} id={wordIndex} className="pl-2 h-8">
                {iterate(words)}
            </div>
        )
    }

    function iterate(word){
        let letters = [];
        for (let i = 0; i < word.length; i++) {
            letters.push(<letter key={uuid()} id={i} className="text-2xl font-mono">{word[i]}</letter>);
        }
        return letters;
    }

    function iterateWords(words){
        let wordsList = [];
        for (let i = 0; i < words.length; i++){
            wordsList.push(createWords(words[i], i));
        }
        return wordsList;
    }

    function noInput(){
        setBlur(true);
    }

    let textTimer;

    if (gameState === "not started"){
        textTimer = window.setTimeout(noInput, 3000);
    }

    // useEffect(() => {
    //     if (gameState == "not started"){
    //         textTimer = window.setTimeout(noInput, 3000)
    //     }
    // }, [keyDown])

    // window.scrollY + document.querySelector('#elementId').getBoundingClientRect().top is for y or top coordinate
    // window.scrollX + document.querySelector('#elementId').getBoundingClientRect().left is for x or left coordinate


    window.addEventListener('keydown', ({code}) => {
        //fix
        let button = document.querySelector(`#${code.charAt(code.length-1).toLowerCase()}`);
        button.classList.remove('text-emerald-500');
        button.classList.remove('bg-sky-900');
        button.classList.add('bg-emerald-500');
        button.classList.add('text-sky-900');
    })

    window.addEventListener('keyup', e => {
        //fix
        let button = document.querySelector(`#${e.code.charAt(e.code.length-1).toLowerCase()}`);
        button.classList.remove('bg-emerald-500');
        button.classList.remove('text-sky-900');
        button.classList.add('bg-sky-900');
        button.classList.add('text-emerald-500');
        let focus = document.querySelector("#typeInput");
        setBlur(false);
        focus.focus();
        clearTimeout(textTimer);
    })

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

    return (
        <div id="test-page" className="w-1/3 h-32 ml-2 pt-3">
            <div id="test-zone" className={`overflow-hidden h-24 bg-emerald-600 rounded-lg ${blur ? 'blur-sm transition duration-300' : null} relative`} onClick={() => inputField.focus()}>
                <input id="typeInput" autoFocus className="absolute z-10" onFocus={() => setBlur(false)} onBlur={() => setBlur(true)} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <div id="text-area" className="flex flex-wrap z-0 absolute">
                    {iterateWords(words)}
                </div>
            </div>
            {blur ? <p className="absolute">press any button to refocus</p> : null}
            <Keyboard />
            {gameState}
        </div>
    )
}