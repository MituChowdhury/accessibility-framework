import React, { useState, useEffect, useRef } from 'react';

const AccessibleCaptcha = ({ onValidation }) => {
    const categories = {
        bird: ['/sounds/bird1.wav', '/sounds/bird2.wav', '/sounds/bird3.wav'],
        carpass: ['/sounds/carpass1.mp3', '/sounds/carpass2.mp3', '/sounds/carpass3.mp3'],
        crowd: ['/sounds/crowd1.mp3', '/sounds/crowd2.mp3', '/sounds/crowd3.mp3'],
        childcrying: ['/sounds/child-crying1.mp3', '/sounds/child-crying2.mp3', '/sounds/child-crying3.mp3'],
        childlaugh: ['/sounds/child-laugh1.mp3', '/sounds/child-laugh2.mp3', '/sounds/child-laugh3.mp3'],
        doorcreaking: ['/sounds/door-creaking1.mp3', '/sounds/door-creaking2.mp3', '/sounds/door-creaking3.mp3'],
        doorknocking: ['/sounds/door-knocking1.mp3', '/sounds/door-knocking2.mp3', '/sounds/door-knocking3.mp3', '/sounds/door-knocking4.mp3'],
        eminor: ['/sounds/eminor1.mp3', '/sounds/eminor2.mp3', '/sounds/eminor3.mp3'],
        femalecough: ['/sounds/female-cough1.mp3', '/sounds/female-cough2.mp3', '/sounds/female-cough3.mp3'],
        femalespeech: ['/sounds/female-speech1.mp3', '/sounds/female-speech2.mp3', '/sounds/female-speech3.mp3', '/sounds/female-speech4.mp3'],
        flute: ['/sounds/flute1.mp3', '/sounds/flute2.mp3', '/sounds/flute3.mp3', '/sounds/flute4.mp3'],
        harmonium: ['/sounds/harmonium1.mp3', '/sounds/harmonium2.mp3', '/sounds/harmonium3.mp3'],
        malecough: ['/sounds/male-cough1.mp3', '/sounds/male-cough2.mp3', '/sounds/male-cough3.mp3', '/sounds/male-cough5.mp3', '/sounds/male-cough4.mp3'],
        malespeech: ['/sounds/male-speech1.mp3', '/sounds/male-speech2.mp3', '/sounds/male-speech3.mp3', '/sounds/male-speech4.mp3', '/sounds/male-speech5.mp3', '/sounds/male-speech6.mp3'],
        tabla: ['/sounds/tabla1.mp3', '/sounds/tabla2.mp3', '/sounds/tabla3.mp3'],
        doorclose: ['/sounds/door-close1.mp3', '/sounds/door-close2.mp3', '/sounds/door-close3.mp3'],
        engine: ['/sounds/engine1.mp3', '/sounds/engine2.mp3', '/sounds/engine3.mp3'],
        frog: ['/sounds/frog1.mp3', '/sounds/frog2.mp3', '/sounds/frog3.mp3'],
        snake: ['/sounds/snake1.mp3', '/sounds/snake2.mp3', '/sounds/snake3.mp3'],
        splash: ['/sounds/splash1.mp3', '/sounds/splash2.mp3', '/sounds/splash3.mp3'],
        train: ['/sounds/train1.mp3', '/sounds/train2.mp3', '/sounds/train3.mp3'],
        waterdrop: ['/sounds/waterdrop1.mp3', '/sounds/waterdrop2.mp3', '/sounds/waterdrop3.mp3'],
        waterpour: ['/sounds/waterpour1.mp3', '/sounds/waterpour2.mp3', '/sounds/waterpour3.mp3']
    };

    const maxAttempts = 3;
    const [attempts, setAttempts] = useState(0);
    const [clips, setClips] = useState([]);
    const [oddIndex, setOddIndex] = useState(null);
    const [status, setStatus] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('challenge'); // "challenge" | "success" | "blocked"
    const [announce, setAnnounce] = useState('');
    const audioCtx = useRef(null);
    const audioNodes = useRef([]);
    const isPlaying = useRef(false);

    const prevResultRef = useRef(null);

    useEffect(() => {
        if (prevResultRef.current !== result) {
            if (result === 'success') {
                onValidation(true);
            } else if (result === 'blocked') {
                onValidation(false);
            }
            prevResultRef.current = result;
        }
    }, [result, onValidation]);

    useEffect(() => {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        generateChallenge();
        return () => {
            stopAllAudio();
            audioCtx.current?.close();
        };
    }, []);

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function stopAllAudio() {
        audioNodes.current.forEach(node => {
            try {
                node.stop();
            } catch (_) { }
        });
        audioNodes.current = [];
        isPlaying.current = false;
    }

    function generateChallenge() {
        if (isPlaying.current) stopAllAudio();
        setStatus('');
        setInputValue('');
        if (result !== 'challenge') setAttempts(0);
        setResult('challenge');

        const keys = Object.keys(categories);
        const cat1 = keys[Math.floor(Math.random() * keys.length)];
        let cat2;
        do {
            cat2 = keys[Math.floor(Math.random() * keys.length)];
        } while (cat2 === cat1);

        const sameSet = shuffle(categories[cat1]).slice(0, 3);
        const odd = [categories[cat2][Math.floor(Math.random() * categories[cat2].length)]];
        const combined = shuffle([...sameSet, ...odd]);

        setClips(combined);
        setOddIndex(combined.findIndex(c => odd.includes(c)));
    }

    async function playChallenge() {
        if (!audioCtx.current || result !== 'challenge') return;

        stopAllAudio();
        isPlaying.current = true;

        for (let i = 0; i < clips.length; i++) {
            if (!isPlaying.current) return;
            setAnnounce(`Playing sound ${i + 1} of 4`);
            setStatus(`Playing sound ${i + 1} of 4`);


            await new Promise(res => setTimeout(res, 1000)); // Give screen reader time


            try {
                const response = await fetch(clips[i]);
                const buffer = await response.arrayBuffer();
                const audioBuffer = await audioCtx.current.decodeAudioData(buffer);

                const source = audioCtx.current.createBufferSource();
                source.buffer = audioBuffer;
                source.playbackRate.value = 1 + (Math.random() * 0.2 - 0.1); // ±10%

                // Filters and noise
                const filter = audioCtx.current.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 3000 + Math.random() * 2000;

                const noise = audioCtx.current.createBufferSource();
                const noiseBuf = audioCtx.current.createBuffer(1, 44100, 44100);
                const data = noiseBuf.getChannelData(0);
                for (let j = 0; j < data.length; j++) {
                    data[j] = (Math.random() * 2 - 1) * 0.02;
                }
                noise.buffer = noiseBuf;

                const gain = audioCtx.current.createGain();
                gain.gain.value = 0.03;

                source.connect(filter).connect(audioCtx.current.destination);
                noise.connect(gain).connect(audioCtx.current.destination);

                audioNodes.current.push(source, noise);

                noise.start();
                source.start();

                await new Promise(resolve => {
                    source.onended = () => {
                        resolve();
                    };
                });

                noise.stop();
                await new Promise(res => setTimeout(res, 300));
            } catch (err) {
                console.error('Playback error:', err);
            }
        }

        isPlaying.current = false;
        setStatus('Enter the number of the odd sound (1–4) and submit.');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (result !== 'challenge') return;
        stopAllAudio();

        const guess = parseInt(inputValue) - 1;
        if (isNaN(guess) || guess < 0 || guess > 3) {
            setAnnounce('Please enter a number between 1 and 4.');
            return;
        }

        if (guess === oddIndex) {
            setResult('success');
            setStatus('✅ Access granted.');
            setAnnounce('Access granted');
        } else {
            const newAttempts = attempts + 1;
            if (newAttempts >= maxAttempts) {
                setResult('blocked');
                setStatus('🚫 Access denied.');
                setAnnounce('Access denied');
            } else {
                setAttempts(newAttempts);
                setStatus(`Wrong. ${maxAttempts - newAttempts} attempts left.`);
                setTimeout(() => generateChallenge(), 1000);
            }
        }

        setInputValue('');
    }

    const isLocked = result !== 'challenge';

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="w-full border border-gray-300 rounded shadow-sm bg-white text-sm">
                {/* Top: PLAY section */}
                <div className="p-4 border-b border-gray-200">
                    <p className="mb-2 text-gray-700 font-medium">Press PLAY to listen</p>
                    <button
                        type="button"
                        onClick={playChallenge}
                        disabled={isLocked}
                        className="w-full py-2 px-4 font-semibold border border-gray-400 rounded text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        PLAY
                    </button>
                </div>

                {/* Input Section */}
                <div className="p-4 border-b border-gray-200">
                    <label htmlFor="answer" className="block mb-2 text-gray-700 font-medium">
                        Enter the number of the odd one
                    </label>
                    <input
                        id="answer"
                        type="number"
                        min="1"
                        max="4"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLocked}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 disabled:opacity-50"
                        placeholder="1–4"
                    />
                    {status && (
                        <p className="mt-2 text-gray-600 text-xs text-center">{status}</p>
                    )}
                    <div className="mt-2 text-center text-[11px] text-gray-400">
                        Attempts: {attempts}/{maxAttempts}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="p-3 flex justify-between items-center border-t border-gray-200 text-gray-600 text-lg">
                    <button
                        type = "button"
                        onClick={generateChallenge}
                        disabled={isLocked}
                        title="New Challenge"
                        className="hover:text-black disabled:opacity-30"
                    >
                        <svg
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                        >
                            <path d="M1 4v6h6" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLocked}
                        className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded flex items-center disabled:opacity-50"
                    >
                        VERIFY
                    </button>
                </div>

                {/* Result Display */}
                {result === 'success' && (
                    <div className="p-4 text-center text-green-600 font-medium">✅ Passed</div>
                )}
                {result === 'blocked' && (
                    <div className="p-4 text-center text-red-600 font-medium">🚫 Access Denied</div>
                )}
            </div>

            {/* ARIA Live Region for VIPs */}
            <div
                aria-live="assertive"
                aria-atomic="true"
                className="sr-only"
            >
                {announce}
            </div>
        </div>
    );
}

export default AccessibleCaptcha