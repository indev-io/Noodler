import React, { useState, useEffect, useLayoutEffect, useRef} from 'react'
import * as Tone from 'tone';
import { allSynths } from './allSynths';
import { useSelector, useDispatch} from 'react-redux';
import { Dropdown, Button, Icon, Segment } from 'semantic-ui-react';
import {moduleMarkerCreator, moduleMarkerCreatorCompact, loopLengthCreator, findBetween} from './timeFunctions'
import { shadeHexColor, showAll } from './guitarDisplayFunctions';
import {noteValues, romanNumerals} from './guitarSVGConstants';
import { guitarPrototype, bassPrototype } from './instrumentPrototypes';
import { data1, data2 } from './dummyData';
import { Note } from '@tonaljs/tonal';
import { setSongData } from '../../store/actions/songDataActions';


export default function GuitarSVG({masterInstrumentArray, activelyDisplayedInstruments}) {
    const state = useSelector((state) => state.module)
    //Change it so that noteColors is global?
    const [instruments, setInstruments] = useState([{instrument:'acoustic_guitar_nylon', noteColors: '', scale:[], tuning:['E4','B3','G3','D3','A2','E2'],stringNumber:6,fretNumber: 24}])
    const [module, setModule] = useState(0);
    const [noteColors, setNoteColors] = useState('')
    const globalPosition = useRef(0); 
    const [data, setData] = useState([
        {
        displayOnly: false,
        highlights: [],
        master: true, 
        data: [{speed:1, notes:[['D4','X','D4 F4 A4', 'E4'],['X','X', 'D4 F4 A4', 'X'],['X', 'G4','D4 F4 A4', 'X'],['B4', 'X','D4 F4 A4', 'F5']]}, {speed:1, notes:[['G5','X', 'F5', 'X'],['E5','X', 'D5', 'X'],['B4','X', 'E4', 'X'],['B4', 'X','E4', 'X']]}, {speed: 1, notes:[['C4','X', 'D4', 'X'],['E4','X', 'F4', 'X'],['G4', 'X','C4', 'X'],['D4','X', 'C4', 'X']]}, {speed:1 , notes:[['A4','X', 'C4', 'X'],['D4','X', 'E4', 'X'],['A5','X', 'C5', 'X'],['D5','X', 'E5', 'X']]}]
    }
    ])
    const [audioSettings, setAudioSettings] = useState([
        {   
            name: 'acoustic guitar 1',
            instrument: 'acoustic_guitar_nylon',
            volume: 0,
            effects:[],
    },
    {   
        name: 'bass 1',
        instrument: 'acoustic bass 1',
        volume: 0,
        effects:[],
    },
    ])
    const [bpm, setBpm] = useState(120)
    const [focus, setFocus] = useState(0)
    const [loop, setLoop] = useState(false)
    const [loopEnd, setLoopEnd] = useState(1)
    const [moduleMarkers, setModuleMarkers] = useState(moduleMarkerCreator(data))
    
    const dispatch = useDispatch()

    const songImportData = useSelector(state => state.songImport)
    const {songImport} = songImportData
    //=====Consts
    const guitarInstruments = [
        "acoustic_guitar_nylon",
        "acoustic_guitar_steel",
        "electric_distortion_guitar",
        "electric_guitar_clean" ,
        "electric_guitar_jazz"
    ]
    const bassInstruments = [
        "acoustic_bass",
        "electric_bass_finger"
    ]
    useEffect(() => {
        handleInstrumentUpdate();
    }, [masterInstrumentArray])
    
    useEffect(() => {
        loadNoteSequenceAndVisualDataOntoTimeline(data)
    }, [data, instruments])

    useEffect(() => {
        if (state !== "Initial Module Data"){
            setData(JSON.parse(state))
            setModuleMarkers(moduleMarkerCreator(JSON.parse(state)))
        } else {
            return
        }
        
    }, [state])

    useEffect (()=>{
        createGuitarSVG();
        dispatch(setSongData(instruments))
    }, [instruments]);
    //====================================
    //=====Update instruments

    useEffect(() => {
        if (songImport){
            setInstruments(songImport['instruments'])
        } else {
            return
        }
    }, [songImport])


function findIndex(name){
        for (var z = 0; z < noteValues.length; z++){
            if (noteValues[z]['name'] === name){
                return z
            }
        }
    }

    //--------------------

function createGuitarSVG(){
    for (var NUM = 0; NUM < instruments.length; NUM++){
        
    var stringWidth = 0.5;
    var y = 10;
    var x = 80;
    //length of imaginary guitar if shown in full
    var scaleLength = 2400;
    //=============================================
    var fretNumber = instruments[NUM]['fretNumber'];
    var tuning = instruments[NUM]['tuning']
    var scale = instruments[NUM]['scale']
    var instrumentType = instruments[NUM]['instrument']
    var noteColor = instruments[NUM]['noteColors'];
    var leftHanded = false;
    var fretPositions = []
    var boardLength = 42 + (scaleLength - (scaleLength/(Math.pow(2, fretNumber/12)))) 
    if (leftHanded === true){
        for (var k = 1; k < fretNumber + 1; k++){
            var result = (boardLength - 40) - (scaleLength - (scaleLength/(Math.pow(2, k/12))))
            fretPositions.push(result)
        } 
    } else {
        for (var k = 1; k < fretNumber + 1; k++){
            var result = 40 + (scaleLength - (scaleLength/(Math.pow(2, k/12))))
            fretPositions.push(result)
        } 
    }

    var boardHeight = 20 + ((instruments[NUM]['tuning'].length - 1) * 50);
    var topBuffer = 15;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute("height", boardHeight + 45 + topBuffer);
    svg.setAttribute("width", boardLength);
    svg.setAttribute("id", "svg" + NUM)
    svg.setAttribute("class", "GuitarSVG")
    
    //neck
    var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute("y", topBuffer)
    rect.setAttribute("width", boardLength);
    rect.setAttribute("height", boardHeight);
    rect.setAttribute("fill", "#BA8C63");
    svg.appendChild(rect)

    //nut
    var nutPosition;
    if (leftHanded === true){
        nutPosition = (boardLength - 40)
    } else {
        nutPosition = 40
    }
    var nut = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    nut.setAttribute("x1", nutPosition);
    nut.setAttribute("x2", nutPosition);
    nut.setAttribute("y1", topBuffer);
    nut.setAttribute("y2", boardHeight + topBuffer);
    nut.setAttribute("stroke-width", "5");
    nut.setAttribute("stroke", "black");
    svg.appendChild(nut);

    //frets
    //Thanks Vincenzo Galilei
    
    for (var j = 0; j < fretNumber + 1; j++){
    var fret = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    fret.setAttribute('x1', fretPositions[j]);
    fret.setAttribute('x2', fretPositions[j]);
    fret.setAttribute('y1', topBuffer);
    fret.setAttribute('y2', boardHeight + topBuffer);
    fret.setAttribute("stroke-width", "4");
    fret.setAttribute("stroke", "#C0C0C0");
    svg.appendChild(fret);
    }
    //fret markers

    if (fretNumber >= 12){
    var fretMarker121 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker121.setAttribute('cx', ((fretPositions[10] + fretPositions[11])/2));
    fretMarker121.setAttribute('cy', ((boardHeight - 10) * 1/3) + topBuffer);
    fretMarker121.setAttribute('r', 10);
    fretMarker121.setAttribute('fill', 'black');
    fretMarker121.setAttribute('class', 'fretmarker');
    fretMarker121.setAttribute('id', 'fretmarker121' + NUM);
    svg.appendChild(fretMarker121);

    var fretMarker122 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker122.setAttribute('cx', ((fretPositions[10] + fretPositions[11])/2));
    fretMarker122.setAttribute('cy', ((boardHeight + 10) * 2/3) + topBuffer);
    fretMarker122.setAttribute('r', 10);
    fretMarker122.setAttribute('fill', 'black');
    fretMarker122.setAttribute('class', 'fretmarker');
    fretMarker122.setAttribute('id', 'fretmarker122' + NUM);
    svg.appendChild(fretMarker122);

    if (fretNumber >= 24){
        //24th fret marker
    var fretMarker241 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker241.setAttribute('cx', ((fretPositions[22] + fretPositions[23])/2));
    fretMarker241.setAttribute('cy', ((boardHeight - 10) * 1/3) + topBuffer);
    fretMarker241.setAttribute('r', 10);
    fretMarker241.setAttribute('fill', 'black');
    fretMarker241.setAttribute('class', 'fretmarker');
    fretMarker241.setAttribute('id', 'fretmarker241' + NUM);
    svg.appendChild(fretMarker241);

    var fretMarker242 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker242.setAttribute('cx', ((fretPositions[22] + fretPositions[23])/2));
    fretMarker242.setAttribute('cy', ((boardHeight + 10) * 2/3) + topBuffer);
    fretMarker242.setAttribute('r', 10);
    fretMarker242.setAttribute('fill', 'black');
    fretMarker242.setAttribute('class', 'fretmarker');
    fretMarker242.setAttribute('id', 'fretmarker242' + NUM);
    svg.appendChild(fretMarker242);

    if (fretNumber >= 36){
        var fretMarker361 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker241.setAttribute('cx', ((fretPositions[34] + fretPositions[35])/2));
    fretMarker241.setAttribute('cy', ((boardHeight - 10) * 2/3));
    fretMarker241.setAttribute('r', 10);
    fretMarker241.setAttribute('fill', 'black');
    fretMarker241.setAttribute('class', 'fretmarker');
    fretMarker241.setAttribute('id', 'fretmarker361' + NUM);
    svg.appendChild(fretMarker361);

    var fretMarker362 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker242.setAttribute('cx', ((fretPositions[34] + fretPositions[35])/2));
    fretMarker242.setAttribute('cy', ((boardHeight + 10) * 1/3));
    fretMarker242.setAttribute('r', 10);
    fretMarker242.setAttribute('fill', 'black');
    fretMarker242.setAttribute('class', 'fretmarker');
    fretMarker242.setAttribute('id', 'fretmarker362' + NUM);
    svg.appendChild(fretMarker362);
    }
    }
    }
    

    //Rest of the fretmarkers
    var fretMarkerPositions = [3, 5, 7, 9, 15, 17, 21]
    var filteredFretMarkerPositions = [];
    for (var i = 0; i < fretMarkerPositions.length; i++){
        if (fretMarkerPositions[i] <= fretNumber){
            filteredFretMarkerPositions.push(fretMarkerPositions[i])
        }
    }
    fretMarkerPositions = filteredFretMarkerPositions;
    // var fretMarkerPositions = [3, 5, 7, 9, 15, 17, 19, 21, 27, 29, 31, 33]
    for (var i = 0; i < fretMarkerPositions.length; i++){
    var fretMarker = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    fretMarker.setAttribute('cx', ((fretPositions[fretMarkerPositions[i] - 2] + fretPositions[fretMarkerPositions[i] -1])/2));
    fretMarker.setAttribute('cy', boardHeight/2 + topBuffer);
    fretMarker.setAttribute('r', 10);
    fretMarker.setAttribute('fill', 'black');
    fretMarker.setAttribute('class', 'fretmarker');
    svg.appendChild(fretMarker);
    }
    //strings
    if (bassInstruments.includes(instrumentType)){
        stringWidth += 2;
    }
    for (var i = 0; i < tuning.length; i++) {
        var string = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        string.setAttribute("x1", 0);
        string.setAttribute("x2", boardLength);
        string.setAttribute("y1", y + topBuffer);
        string.setAttribute("y2", y + topBuffer);
        string.setAttribute("stroke-width", stringWidth);
        string.setAttribute("stroke", "#71797E");
        svg.appendChild(string);
        y += 50;
        stringWidth += 0.5;
     };
    //note
    var noteX = 20;
    var noteY = 10;
    //generate notes
    for (var k = 0; k < tuning.length; k++){
        var index = findIndex(tuning[k]);
        for (var l = 0; l < fretNumber + 1; l++){

            var note = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            if (leftHanded === true){
                if (l === 0){
                    note.setAttribute('cx', boardLength - 20);
                } else if (l === 1){
                    note.setAttribute('cx', (boardLength - 40 + fretPositions[0])/2)
                } else {
                    note.setAttribute('cx', (fretPositions[l -2] + fretPositions[l -1])/2)
                }
            } else {
                if (l === 0){
                    note.setAttribute('cx', 20);
                } else if (l === 1){
                    note.setAttribute('cx', (40 + fretPositions[0])/2)
                } else {
                    note.setAttribute('cx', (fretPositions[l -2] + fretPositions[l -1])/2)
                }
            }
            
            note.setAttribute('cy', noteY + topBuffer);
            note.setAttribute('r', 15);
            if (noteColor === 'black'){
                note.setAttribute('fill', "black");
            } else {
                note.setAttribute('fill', shadeHexColor(noteValues[index]["color"], (noteValues[index]["octave"] * 0.06) ));
            }
            note.setAttribute('stroke', "azure");
            note.setAttribute('stroke-width', "2");
            note.setAttribute('class', noteValues[index]["name"] + '_' + NUM + ' note_' + NUM + ' note note_pitchClass_' + Note.pitchClass(noteValues[index]["name"]) + '_' + NUM);
            note.setAttribute('id', (k + 1) + "_" + l + "_" + NUM);
            //specialNotes
            var noteDiamond = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
            var thisX;
            var thisY;
            if (leftHanded === true){
                if (l === 0){
                    thisX = boardLength - 20
                } else if (l === 1){
                    thisX = (boardLength - 40 + fretPositions[0])/2
                } else {
                    thisX = (fretPositions[l -2] + fretPositions[l -1])/2
                }
            } else {
                if (l === 0){
                    thisX = 20
                } else if (l === 1){
                    thisX = (40 + fretPositions[0])/2
                } else {
                    thisX = (fretPositions[l -2] + fretPositions[l -1])/2
                }
            }
            thisY = noteY + topBuffer - 21
            noteDiamond.setAttribute('x', thisX)
            noteDiamond.setAttribute('y', thisY);
            noteDiamond.setAttribute('height', 30);
            noteDiamond.setAttribute('width', 30);
            if (noteColor === 'black'){
            noteDiamond.setAttribute('fill', "black");
            } else {
            noteDiamond.setAttribute('fill', shadeHexColor(noteValues[index]["color"], (noteValues[index]["octave"] * 0.06) ));
            }
            noteDiamond.setAttribute('stroke', "azure");
            noteDiamond.setAttribute('stroke-width', "2");
            noteDiamond.setAttribute('class', noteValues[index]["name"] + '_' + NUM + '_special notespecial_' + NUM + ' notespecial notespecial_pitchClass_' + Note.pitchClass(noteValues[index]["name"]) + '_' + NUM);
            noteDiamond.setAttribute('id', (k + 1) + "_" + l + "_" + NUM + 'special');

            noteDiamond.setAttribute('stroke', "azure");
            noteDiamond.setAttribute('stroke-width', "2");
            noteDiamond.setAttribute('transform', `translate(${thisX}, ${thisY}) rotate(45) translate(-${thisX}, -${thisY})`);
            noteDiamond.setAttribute('visibility', 'hidden');
            var noteName = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            if (leftHanded === true){
                if (l === 0){
                    noteName.setAttribute('x', boardLength - 20);
                } else if (l === 1){
                    noteName.setAttribute('x', (boardLength - 40 + fretPositions[0])/2)
                } else {
                    noteName.setAttribute('x', (fretPositions[l -2] + fretPositions[l -1])/2)
                }
            } else {
                if (l === 0){
                    noteName.setAttribute('x', 20);
                } else if (l === 1){
                    noteName.setAttribute('x', (40 + fretPositions[0])/2)
                } else {
                    noteName.setAttribute('x', (fretPositions[l -2] + fretPositions[l -1])/2)
                }
            }
            noteName.setAttribute('y', noteY + topBuffer);
            noteName.setAttribute('text-anchor', 'middle');
            if (noteColor === 'black'){
                noteName.setAttribute('fill', "white");
            } else {
                noteName.setAttribute('fill', 'black');
            }
            noteName.setAttribute('dominant-baseline', 'middle');
            noteName.setAttribute('font-size', '15px');
            noteName.setAttribute('class', noteValues[index]["name"] + '_' + NUM + '_name notename_' + NUM + ' notename notename_pitchClass_' + Note.pitchClass(noteValues[index]["name"]) + '_' + NUM)
            noteName.setAttribute('id', (k + 1) + "_" + l + "_" + NUM + "_name");
            noteName.textContent = noteValues[index]["name"];
            if (scale.indexOf(noteValues[index]["note"]) === -1){
                note.setAttribute('visibility', 'hidden');
                noteName.setAttribute('visibility', 'hidden');
            }
            svg.appendChild(note);
            svg.appendChild(noteDiamond);
            svg.appendChild(noteName);

            noteX += 40;
            index += 1;
        }
        noteY += 50;
        noteX = 20;
    }
    //generate fretIndicators
    
    for (var l = 1; l < fretNumber + 1; l++){
        var fretIndicator = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        if (leftHanded === true){
            if (l === 1){
                fretIndicator.setAttribute('x', (boardLength - 40 + fretPositions[0])/2)
            } else {
                fretIndicator.setAttribute('x', (fretPositions[l -2] + fretPositions[l -1])/2)
            }
        } else {
            if (l === 1){
                fretIndicator.setAttribute('x', (40 + fretPositions[0])/2)
            } else {
                fretIndicator.setAttribute('x', (fretPositions[l -2] + fretPositions[l -1])/2)
            }
        }
           
        fretIndicator.setAttribute('font-size', '15px');
        fretIndicator.textContent = romanNumerals[l];
        fretIndicator.setAttribute('text-anchor', 'middle')
        fretIndicator.setAttribute('y', boardHeight + 30 + topBuffer)
        svg.appendChild(fretIndicator);
    }

        const guitarDiv = document.getElementById(`divGuitar${NUM}`);

        if (guitarDiv.firstChild){
            while (guitarDiv.firstChild){
                guitarDiv.removeChild(guitarDiv.firstChild)
            }
        }
        guitarDiv.appendChild(svg)
    }
    
}

function positionNamer(notesArr, tuning){
    //See if you can make this change for each board 
    var fretNumber = 24;

    //generate fretboard
    var fretboard = [];
    for (var i = 0; i < tuning.length; i++){
        var stringNotes = [];
        var index = findIndex(tuning[i]);
        for (var j = 0; j < fretNumber + 1; j++){
            stringNotes.push(noteValues[index + j]['name'])
        }
        fretboard.push(stringNotes)
    }

    var allPositions = [];
    //scan etc


    //single note function

    if (Array.isArray(notesArr) === false){
        for (var k = 0; k < tuning.length;k++){
            var foundFretIndex = fretboard[k].indexOf(notesArr);
        //if the note we're looking for is on the string 
            if (foundFretIndex !== -1){
            var indexID = (k + 1 + "_" + foundFretIndex);
            allPositions.push([indexID]);
        }
    }
    return allPositions;
}
    //if the array is only one note long
    if (notesArr.length === 1){
        for (var k = 0; k < tuning.length;k++){
            var foundFretIndex = fretboard[k].indexOf(notesArr[0]);
        //if the note we're looking for is on the string 
            if (foundFretIndex !== -1){
            var indexID = (k + 1 + "_" + foundFretIndex);
            allPositions.push([indexID]);
        }
    }
    return allPositions;
}



    //Multiple notes --> continue

    function alreadyCalled(val){
        var state = false;
        for (var m = 0; m < allPositions.length; m++){
            if (allPositions[m].indexOf(val) !== -1){
                state = true;
            }
    }
    return state;
}   

    function notSharingString(val){
        
        var stringsInUse = [];
        for (var i = 0; i< singlePosition.length; i++){
            var calledNote = (singlePosition[i][0])
            stringsInUse.push(calledNote);
        }
        if (stringsInUse.indexOf((val[0])) === -1){
            return true;
        } else {
            return false;
            
        }
    }

const anchorNoteIndex = notesArr.length - 1;
//update fingering Or something so that it can't put two things on same line
    function fingeringSort(arr, anchorNoteID){

        var smallest = Infinity
        var smallestIndex = 0;
        for (var i = 0; i < arr.length; i++){
            var anchorNote = Number(anchorNoteID.split('_')[1]);
            var movingNote = Number(arr[i].split('_')[1]);
            if ((Math.abs(anchorNote - movingNote)) < smallest){
                smallest = Math.abs(anchorNote - movingNote);
                smallestIndex = i;
            }
        }
    return arr[smallestIndex] + "";
    }
    //is it complete?
    var complete = false;
    //make sure that it hasn't been called before
    
    var notesArrIndex = notesArr.length - 1;
    var toBeSorted = [];
    var singlePosition = [];
    var anchorNoteID = '';
    var safetyCount = 0;

    while (complete === false){
        
        //scan strings
        
        
        for (var k = 0;  k < tuning.length;){
            var foundFretIndex = fretboard[k].indexOf(notesArr[notesArrIndex]);
            //if the note we're looking for is on the string 
            if (foundFretIndex !== -1){
                var indexID = (k + 1 + "_" + foundFretIndex);
                //and its the anchor note
                if (notesArrIndex === anchorNoteIndex){
                    //and it hasnt been called before
                    if (alreadyCalled(indexID) === false){
                        //push it
                        notesArrIndex--;
                        singlePosition.push(indexID);
                        anchorNoteID = indexID;
                        continue;
                    }
                }
                //if it isnt the anchor note and it hasn't been called
                if ((alreadyCalled(indexID) === false) && (notSharingString(indexID))){
                    //and it isn't on the same string as a previous thing
                    toBeSorted.push(indexID);
                }
            }
            //if its the last string scan
            if (k === tuning.length -1){
                notesArrIndex--;
                var bestNote = (fingeringSort(toBeSorted, anchorNoteID));
                singlePosition.push(bestNote);
                toBeSorted = [];
                //if it is the last string and last note
                if (notesArrIndex === -1){
                    if (singlePosition.indexOf("undefined") !== -1){
                        complete = true;
                    } else {
                        allPositions.push(singlePosition);
                        singlePosition = [];
                        notesArrIndex = notesArr.length - 1
                        safetyCount++
                        if (safetyCount > 6){
                            complete = true;
                        }
                    }
                }  
            }
            k++;
        }
    }

    return allPositions;
}

var playPosition = 0;

function flattenNotes(notes, returnArr){
    if (returnArr === undefined){
        returnArr = [];
    }
        for (var i = 0; i < notes.length; i++){
            if (Array.isArray(notes[i]) === false){
                returnArr.push(notes[i])
            } else {
                flattenNotes(notes[i], returnArr);
            }
        }
    return returnArr;
}   

function noteStringHandler(notes){
    var returnArr = []
    if (notes.indexOf(' ') === -1){
        returnArr.push(notes)
    } else {
        returnArr = notes.split(' ')
    }
    return returnArr
}

function handleInstrumentUpdate(){
    var clone = [...instruments]
    var cloneData =[...data]
    var clonePrototype = guitarPrototype
    if (masterInstrumentArray.length === instruments.length){
        return
    } else if (masterInstrumentArray.length > instruments.length){
        clone.push(clonePrototype)
        setInstruments(clone)
    } else if (masterInstrumentArray.length < instruments.length){
        clone.pop()
        cloneData.pop()
        setInstruments(clone)
        setData(cloneData)
    }
}
//======

function playHandler(){
    Tone.start();
    Tone.Transport.cancel();
    loadNoteSequenceAndVisualDataOntoTimeline(data)
    Tone.Transport.start();
}

function loadNoteSequenceAndVisualDataOntoTimeline(data){
    Tone.Transport.cancel();
    var playPositions = [];
    for (var j = 0; j < data.length; j++){
        playPositions.push(0)
    }
    function returnPosition(note, tuning){
        if (positionNamer(noteStringHandler(note), tuning)[globalPosition.current] === undefined){
            return positionNamer(noteStringHandler(note), tuning)[positionNamer(noteStringHandler(note), tuning).length -1]
        } else {
            return positionNamer(noteStringHandler(note), tuning)[globalPosition.current]
        }
    }
    function setUpSequence(data, instrument, instrumentNumber, displayOnly){
        for (var i = 0; i < data.length; i++){
            var tuning = instruments[instrumentNumber]['tuning']
            new Tone.Sequence(
                 // eslint-disable-next-line no-loop-func
                 function(time, note) {
                  if (note !== 'X' && displayOnly === false){
                      instrument.triggerAttackRelease(noteStringHandler(note), 0.5, time);
                      
                  }
                  var currentTime = Tone.Time(Tone.Transport.position).toSeconds()
                  setModule(findBetween(currentTime, moduleMarkerCreatorCompact(data))['playingIndex'])
                  //
                  //hide all
                  if (note !== 'X'){
                    var x = document.getElementsByClassName('note_' + instrumentNumber);
                    var y = document.getElementsByClassName('notename_' + instrumentNumber);
                    var z = document.getElementsByClassName('notespecial_' + instrumentNumber);
                for (var i = 0; i < x.length; i++){
                    x[i].setAttribute('visibility', 'hidden');
                    y[i].setAttribute('visibility', 'hidden');
                    z[i].setAttribute('visibility', 'hidden');
                }
                  }
                
                //============== Display Notes
              if (note !== 'X'){
                var currentArray = noteStringHandler(note);
                var highlights = [1];
                if (displayOnly){
                    for (var i = 0; i < currentArray.length; i++){
                        var x;
                        var y;
                        if (highlights.includes(i + 1)){
                            x = document.getElementsByClassName('notespecial_pitchClass_' + currentArray[i] + '_' + instrumentNumber);
                        } else {
                            x = document.getElementsByClassName('note_pitchClass_' + currentArray[i] + '_' + instrumentNumber);
                        }
                        y = document.getElementsByClassName('notename_pitchClass_' + currentArray[i] + '_' + instrumentNumber);
                    for (var j = 0; j < x.length; j++){
                        x[j].setAttribute('visibility', '');
                        y[j].setAttribute('visibility', '');
                    }
                    }
                } else if (globalPosition.current < 0){
                    for (var w = 0; w < currentArray.length; w++){
                        var x = document.getElementsByClassName(currentArray[w] + '_' + instrumentNumber);
                        var y = document.getElementsByClassName(currentArray[w] + '_' + instrumentNumber + '_name');
                        if (x !== null && y !== null && x !== undefined && y !== undefined){
                            for (var j = 0; j < x.length; j++){
                                if (w === 0 && j === 0){
                                    // console.log(x[0], 'X', y[0], 'y')
                                }
                                x[j].setAttribute('visibility', '');
                                y[j].setAttribute('visibility', '');
                                // note.setAttribute('class', noteValues[index]["name"] + '_' + NUM + ' note_' + NUM + ' note');
                                // noteDiamond.setAttribute('class', noteValues[index]["name"] + '_' + NUM + '_special notespecial_' + NUM + ' notespecial');
                                // noteName.setAttribute('class', noteValues[index]["name"] + '_' + NUM + '_name notename_' + NUM + ' notename' )
                            }
                        } else {
                            console.log('off Model!')
                        }
                    }
                } else {
                    var pos = returnPosition(note, tuning);
                    // var tabArray = []
                    if (pos !== undefined){
                        for (var w = 0; w < pos.length; w++){
                            var x = document.getElementById(pos[w] + '_' + instrumentNumber);
                            var y = document.getElementById(pos[w] + '_' + instrumentNumber + '_name');
                            if (x !== null && y !== null){
                                x.setAttribute('visibility', '');
                                y.setAttribute('visibility', '');
                            }
                            // tabArray.push(x.getAttribute('id')); 
                        }
                        // generateTab(tabArray);
                    } else {
                        console.log('off Model!')
                    }
                }
              }

        if (playPosition < flattenNotes(data).length - 1){
            playPosition++;
        } else {
            playPosition = 0;
        }
                },
               data[i]['notes'],
                (data[i]['speed'] * Tone.Time('4n').toSeconds()) 
              )
              
                .start(moduleMarkers[i])
                .loop = 1;
            }  
    }
    for (var j = 0; j < data.length; j++){
        setUpSequence(data[j]['data'], allSynths[instruments[j]['instrument']], j, data[j]['displayOnly'])
    }
}
//----------------------------------



//========reload guitar on change? good


const tuningOptions = [
    {key: 'Standard 1', text: 'E', value: ['E4']},
    {key: 'Standard 2', text: 'BE', value: ['E4', 'B3']},
    {key: 'Standard 3', text: 'GBE', value: ['E4', 'B3', 'G3']},
    {key: 'Standard 4', text: 'DGBE', value: ['E4', 'B3', 'G3', 'D3']},
    {key: 'Standard 5', text: 'ADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2']},
    {key: 'Standard 6', text: 'EADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']},
    {key: 'Standard 7', text: 'BEADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1']},
    {key: 'Standard 8', text: 'F#BEADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1']},
    {key: 'Standard 9', text: 'C#F#BEADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1', 'C#1']},
    {key: 'Standard 10', text: 'G#C#F#BEADGBE', value: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1', 'C#1', 'G#0']},
    {key: 'Bass', text: 'Bass: EADG', value: ['G2', 'D2', 'A1', 'E1']},
    {key: 'DADGAD', text: 'DADGAD', value: ['D4', 'A3', 'G3', 'D3', 'A2', 'D2']},
    {key: 'P4', text: 'P4', value: ['F4', 'C4', 'G3', 'D3', 'A2', 'E2']},
    {key: 'DropD', text: 'DropD', value: ['E4', 'B4', 'G3', 'D3', 'A2', 'D2']},
]

const instrumentOptions = [
    {key: 'acoustic_bass', text: 'Acoustic Bass', value: 'acoustic_bass'},
    {key: 'electic_bass_finger', text: 'Electric Bass ', value: 'electric_bass_finger'},
    {key: 'acoustic_guitar_nylon', text: 'Acoustic Guitar Nylon', value: 'acoustic_guitar_nylon'},
    {key: 'acoustic_guitar_steel', text: 'Acoustic Guitar Steel', value: 'acoustic_guitar_steel'},
    {key: 'electric_guitar_clean', text: 'Electric Guitar Clean', value: 'electric_guitar_clean'},
    {key: 'electric_guitar_jazz', text: 'Electric Guitar Jazz', value: 'electric_guitar_jazz'},
    {key: 'electric_distortion_guitar', text: 'Electric Guitar Distorted', value: 'electric_distortion_guitar'},

]

//=====functions to handle clicks

function loopOn(){
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = loopLengthCreator(data);
    if (Tone.Transport.loop !== true){
        Tone.Transport.loop = true;
        setLoop(true)
    } else {
        Tone.Transport.loop = false;
        setLoop(false)
    }
}

//Temp storage for direction NEXT on module play
function handlePreviousNextModulePlay(direction){
    var currentTime = Tone.Time(Tone.Transport.position).toSeconds();
    // console.log(currentTime, lastCurrentTime.current)
    if (direction === 'next'){
        Tone.Transport.position = findBetween(currentTime + 0.01, moduleMarkers)['next']
    }
    if (direction === 'previous'){
        Tone.Transport.position = findBetween(currentTime, moduleMarkers)['previous']
    }
    if (direction === 'current'){
        Tone.Transport.position = findBetween(currentTime, moduleMarkers)['current']
    }
}

function handleStringChange(direction, instrumentNumber){
    var clone = [...instruments]
    var tuning = clone[instrumentNumber]["tuning"]
    var stringNumber = clone[instrumentNumber]["stringNumber"]
    if (direction === 'down'){
        if (stringNumber !== 1){
            tuning.pop()
            stringNumber = tuning.length;
            setInstruments(clone)
        }
    } 
    if (direction === 'up'){
        var newNote = noteValues[findIndex(tuning[tuning.length - 1]) - 5];
        if (newNote === undefined){
            return
        } else {
        tuning.push(newNote['name'])
        stringNumber = stringNumber + 1
        setInstruments(clone)
        }
    }
}

function handleFretChange(direction, instrumentNumber){
    var clone = [...instruments]
    if (direction === 'down'){
        clone[instrumentNumber]["fretNumber"] = clone[instrumentNumber]["fretNumber"] - 1
        setInstruments(clone)
    }
    if (direction === 'up'){
        clone[instrumentNumber]["fretNumber"] = clone[instrumentNumber]["fretNumber"] + 1
        setInstruments(clone)
    }  
    
}

const onChangeTuning = (e, {id, value}) => {
    var clone = [...instruments]
    var idx = Number(id.split("_")[1])
    clone[idx]['tuning'] = value
    console.log(id)
    setInstruments(clone)
  }

const onChangeInstrument = (e, {id, value}) => {
   
    var clone = [...instruments]
    var idx = Number(id.split("_")[1])

   if (guitarInstruments.includes(value)){
       clone[idx] = JSON.parse(JSON.stringify(guitarPrototype))
       clone[idx]['instrument'] = value;
    setInstruments(clone)
       
   }
   if (bassInstruments.includes(value)){
    clone[idx] = JSON.parse(JSON.stringify(bassPrototype))
    clone[idx]['instrument'] = value;
    setInstruments(clone)
    }
  }

function addRemoveGuitars(action){
    var clone = [...instruments]
    if (action === 'add'){
        clone.push(guitarPrototype)
        setInstruments(clone)
    } else if (action === 'remove'){
        clone.pop()
        setInstruments(clone)
    }
}

function mapGuitarSVGContainers(instruments){
    var clone = [...instruments]
    return(
       instruments.map((instruments, idx) =>
            <div id={'SVGContainer' + idx} key={'SVGContainer' + idx}>
        <Button.Group>
            <Button compact basic onClick={()=> handleStringChange('down', idx)}> <Icon name ='left arrow'/></Button>
            <Segment>
            Strings: {clone[idx]['tuning'].length}
            </Segment>
            <Button compact basic onClick={()=> handleStringChange('up', idx)}> <Icon name ='right arrow'/></Button>
        </Button.Group>
        <Dropdown
        search
        selection
        id={`instrument_${idx}`}
        options={instrumentOptions}
        onChange={onChangeInstrument}
        value={clone[idx]['instrument']}
        />
        <Dropdown
        placeholder={instruments['tuning']}
        search
        selection
        id={`tuning_${idx}`}
        onChange={onChangeTuning}
        options={tuningOptions}
        value={instruments['tuning']}
        />
        <Button.Group>
            <Button compact basic onClick={()=> handleFretChange('down', idx)}> <Icon name ='left arrow'/></Button>
            <Segment>
            Frets: {clone[idx]['fretNumber']}
            </Segment>
            <Button compact basic onClick={()=> handleFretChange('up', idx)} > <Icon name ='right arrow'/></Button>
        </Button.Group>
        <div id={`divGuitar${idx}`}></div>
        </div>
        )
    )
}

function displayByPitchClass(notes, highlights, board){
    for (var i = 0; i < notes.length; i++){
        var x;
        var y;
        if (highlights.includes(i + 1)){
            x = document.getElementsByClassName('notespecial_pitchClass_' + notes[i] + '_' + board);
        } else {
            x = document.getElementsByClassName('note_pitchClass_' + notes[i] + '_' + board);
        }
        y = document.getElementsByClassName('notename_pitchClass_' + notes[i] + '_' + board);
    for (var j = 0; j < x.length; j++){
        x[j].setAttribute('visibility', '');
        y[j].setAttribute('visibility', '');
    }
    }
    

    
}


//Notes for Arrow forward, etc, Make seperate functions for 'nudge'. If in General Mode, nudge moves you 1 quarter note, if in Focus, nudge moves you to the next note!
    return (
        <>
        {mapGuitarSVGContainers(instruments)}
        <Button compact basic onClick={() => console.log(moduleMarkers)}>test</Button>
        <Button compact basic onClick={() => Tone.Transport.stop()}><Icon name='stop'/></Button>
        <Button compact basic onClick={() => Tone.Transport.pause()}><Icon name='pause'/></Button>
        <Button compact basic onClick={() => playHandler()}><Icon name='play'/> </Button>
        <Button compact basic active={loop === true} onClick={()=>loopOn()}><Icon name='retweet'/></Button>
        <Button compact basic onClick={() => handlePreviousNextModulePlay('previous')} ><Icon name='fast backward'/></Button>
        <Button compact basic onClick={() => handlePreviousNextModulePlay('current')} ><Icon name='eject'/></Button>
        <Button compact basic onClick={() => handlePreviousNextModulePlay('next')}><Icon name='fast forward'/></Button>
        <Button compact basic onClick={() => globalPosition.current--}><Icon name='arrow down'/></Button>
        <Button compact basic onClick={() => globalPosition.current++}><Icon name='arrow up'/></Button>
        <Button compact basic onClick={() => globalPosition.current = -1}><Icon name='arrows alternate vertical'/></Button>
        {/* <Button compact basic onClick={()=>console.log('backstep')}><Icon name='step backward'/></Button>
        <Button compact basic onClick={()=>console.log('forwardstep')}><Icon name='step forward'/></Button> */}
        {/* <Button compact basic onClick={() => addRemoveGuitars('add')} >Add Guitar</Button> */}
        {/* <Button compact basic onClick={() => addRemoveGuitars('remove')} >Remove Guitar</Button> */}
        {/* <Button compact basic onClick={() => showAll()} >Show All</Button> */}
        </>
    )
}
