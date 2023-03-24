import React from 'react';

export default function Keyboard({ gameState }){
    return (
        <div className={`${gameState === "started" ? "opacity-60" : null}`}>
            <div className="flex justify-center gap-3 my-2 w-full">
                <kbd id="q" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">q</kbd>
                <kbd id="w" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">w</kbd>
                <kbd id="e" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">e</kbd>
                <kbd id="r" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">r</kbd>
                <kbd id="t" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">t</kbd>
                <kbd id="y" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">y</kbd>
                <kbd id="u" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">u</kbd>
                <kbd id="i" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">i</kbd>
                <kbd id="o" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">o</kbd>
                <kbd id="p" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">p</kbd>
            </div> 
            <div className="flex justify-center gap-3 my-2 w-full">
                <kbd id="a" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">a</kbd>
                <kbd id="s" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">s</kbd>
                <kbd id="d" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">d</kbd>
                <kbd id="f" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">f</kbd>
                <kbd id="g" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">g</kbd>
                <kbd id="h" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">h</kbd>
                <kbd id="j" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">j</kbd>
                <kbd id="k" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">k</kbd>
                <kbd id="l" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">l</kbd>
            </div>
            <div className="flex justify-center gap-3 my-2 w-full">
                <kbd id="z" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">z</kbd>
                <kbd id="x" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">x</kbd>
                <kbd id="c" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">c</kbd>
                <kbd id="v" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">v</kbd>
                <kbd id="b" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">b</kbd>
                <kbd id="n" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">n</kbd>
                <kbd id="m" className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">m</kbd>
                <kbd className="kbd kbd-sm text-2xl font-bold px-7 py-3 text-emerald-500 border-0 bg-sky-900 shadow-xl">/</kbd>
            </div>
        </div>
    )
}