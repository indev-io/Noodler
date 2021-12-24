import React, {useState, useRef} from 'react'
import { Scale, Note } from '@tonaljs/tonal';
import DragAndFillCard from '../DragAndDrop/DragAndFillCard'
import { Menu , Input, Dropdown} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { scaleHandler } from './utils';
import * as Tone from 'tone';
import { keySynth, polySynth } from './synths';

export default function ModuleLab() {
    const [name, setName] = useState('Module 1')
    const [keyName, setKeyName] = useState('Key: C')
    const [key, setKey] = useState('C')
    const [options, setOptions] = useState('sharps')
    var sequence = useRef('')

    const initState = {
        lab: {activeLabIndices: [0]},
        scaleLab: { 
            name: 'C major',
            scaleName: 'C major',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            binary: [1,0,1,0,1,1,0,1,0,1,0,1],
            number: 2773,
            dataType: 'scale',
            pool: '',
    },
        chordLab: {
            name: 'CM',
            patternName: 'CM',
            desc: '',
            chord: ['C3', 'E3', 'G3'],
            position: [],
            author: '',
            authorId: '',
            dataType: 'chord',
            pool: ''
        },
        patternLab: {
            name: 'Pattern 1',
            patternName: 'Pattern 1',
            desc: '',
            type: 'pattern',
            length: 0,
            pattern: [7, 8, 9, 18, 14, 13, 11, 12],
            position: [],
            author: '',
            authorId: '',
            dataType: 'pattern',
            pool: ''
        },
        rhythmLab: {
            name: 'Rhythm 1',
            rhythmName: 'Rhythm 1',
            desc: '',
            rhythm: [['O'], ['O'], ['O'], ['O']],
            length: 4,
            noteSlots: 0,
            speed: 1,
            author: '',
            authorId: '',
            dataType: 'rhythm',
            pool: ''
        },
        moduleLab: {
            name: '',
            desc: '',
            author: '',
            pool: '',
        }
    }

    const labData = useSelector(state => state.labData)
    const {labInfo} = labData

    const dropdownOptionsKeySharp = 
    [
        { key: 1, text: 'C', value: 'C'},
        { key: 2, text: 'C#', value: 'C#'},
        { key: 3, text: 'D', value: 'D'},
        { key: 4, text: 'D#', value: 'D#'},
        { key: 5, text: 'E', value: 'E'},
        { key: 6, text: 'F', value: 'F'},
        { key: 7, text: 'F#', value: 'F#'},
        { key: 8, text: 'G', value: 'G'},
        { key: 9, text: 'G#', value: 'G#'},
        { key: 10, text: 'A', value: 'A'},
        { key: 11, text: 'A#', value: 'A#'},
        { key: 12, text: 'B', value: 'B'}
    ]

    const dropdownOptionsKeyFlat = [
        { key: 1, text: 'C', value: 'C'},
        { key: 2, text: 'Db', value: 'Db'},
        { key: 3, text: 'D', value: 'D'},
        { key: 4, text: 'Eb', value: 'Eb'},
        { key: 5, text: 'E', value: 'E'},
        { key: 6, text: 'F', value: 'F'},
        { key: 7, text: 'Gb', value: 'Gb'},
        { key: 8, text: 'G', value: 'G'},
        { key: 9, text: 'Ab', value: 'Ab'},
        { key: 10, text: 'A', value: 'A'},
        { key: 11, text: 'Bb', value: 'Bb'},
        { key: 12, text: 'B', value: 'B'}
    ]

    //========functions for player

    function noteStringHandler(notes){
        var returnArr = []
        if (notes.indexOf(' ') === -1){
            returnArr.push(notes)
        } else {
            returnArr = notes.split(' ')
        }
        return returnArr
    }
    var allScaleNotes = [];
    var scaleNotes = labInfo && labInfo['scaleLab'] && labInfo['scaleLab']['scale'] ? scaleHandler(labInfo['scaleLab']['scale'], options) : Scale.get('c major').notes;
    var allChromaticNotes = [];
    var chromaticNotes = scaleHandler(Scale.get('c chromatic').notes, options);
    var pattern = labInfo && labInfo['patternLab'] && labInfo['patternLab']['pattern'] ? labInfo['patternLab']['pattern'] : initState['patternLab']['pattern']
    var rhythm = labInfo && labInfo['rhythmLab'] && labInfo['rhythmLab']['rhythm'] ? labInfo['rhythmLab']['rhythm'] : initState['rhythmLab']['rhythm']
    var playConstant = labInfo && labInfo['rhythmLab'] && labInfo['rhythmLab']['speed'] ? labInfo['rhythmLab']['speed'] : initState['rhythmLab']['speed']

for (var o = 0; o < 10; o++){
    for (var p = 0; p < chromaticNotes.length; p++){
        allChromaticNotes.push(chromaticNotes[p] + o)
    }
}

//generate all scale specific notes
    for (var n = 0; n < allChromaticNotes.length; n++){
        if (scaleNotes.includes(Note.pitchClass(allChromaticNotes[n]))){
            allScaleNotes.push(allChromaticNotes[n])
        }
    }
    function patternAndScaleToNotes(patternX){
        var clonePattern = patternX
        var notesExport = [];
        var root = scaleNotes[0] + 3
        const allNotes = Note.sortedNames(allScaleNotes);
        //------------
        var startingIndex;
        if (allNotes.indexOf(root) === -1){
            startingIndex = allNotes.indexOf(Note.enharmonic(root))
        } else {
            startingIndex = allNotes.indexOf(root)
        }
        var startingChromaticIndex;
        if (allChromaticNotes.indexOf(root) === -1){
            startingChromaticIndex = allChromaticNotes.indexOf(Note.enharmonic(root))
        } else {
            startingChromaticIndex = allChromaticNotes.indexOf(root);
        }
        for (var k = 0; k < clonePattern.length; k++){
            //check if flag is added to clonePattern
            if (typeof clonePattern[k] === 'string'){
                notesExport.push(allChromaticNotes[startingChromaticIndex + Number(clonePattern[k].split("").slice(1).join(""))])
            } else {
                notesExport.push(allNotes[startingIndex + clonePattern[k]])
            }
        }
        console.log(notesExport, 'NOTES EXPORT!')
        return notesExport
    }

    function mapNotesToRhythm(notes, rhythm){
        var cloneRhythm = JSON.parse(JSON.stringify(rhythm))
        var cloneNotes = notes.slice();
        var count = 0;
        function recursiveNoteToRhythmMapper(cloneRhythm){
                for (var i = 0; i < cloneRhythm.length; i++){
                    if (Array.isArray(cloneRhythm[i]) === false){
                        if (cloneRhythm[i] === 'O'){
                            if (cloneNotes[count] === undefined){
                                cloneRhythm[i] = 'X'
                            } else {
                                cloneRhythm[i] = cloneNotes[count]
                                count++;
                            }
                            
                        }
                    } else {
                        recursiveNoteToRhythmMapper(cloneRhythm[i]);
                    }
                }
        }
        recursiveNoteToRhythmMapper(cloneRhythm);
        return cloneRhythm;
    }

    function playModule(){
        Tone.start()
        Tone.Transport.cancel();
        Tone.Transport.stop();
        Tone.Transport.start();
        var notesToMap = patternAndScaleToNotes(pattern)
        var sequence = mapNotesToRhythm(notesToMap, rhythm)

            var synthPart = new Tone.Sequence(
              function(time, note) {
                if (note !== 'X'){
                    polySynth.triggerAttackRelease(note, 0.2, time);
                }
               
              },
             sequence,
              (playConstant * Tone.TransportTime('4n').toSeconds())
            );
            
              synthPart.start();
              synthPart.loop = 1;
    }



    
    //====draganddrop functionality
    const dragStartHandler = e => {
        var obj = {id: e.currentTarget.id, className: e.target.className, message: '', type: 'moduleLab'}
        e.dataTransfer.setData('text', JSON.stringify(obj));
        console.log(obj)
    };

    const dragHandler = e => {
        };

    const onChangeDropdown = (e, {value}) => {
        setKey(value)
      }

    return (
        <>
        <Menu>
         <Menu.Item onClick={() => playModule()} >Play</Menu.Item>  
         <Dropdown onChange={onChangeDropdown} options={options === 'sharps' ? dropdownOptionsKeySharp : dropdownOptionsKeyFlat} text = {`Key: ${key}`} simple item/>
         <Menu.Item > Export </Menu.Item>   
         <Menu.Item onClick={() => console.log(labInfo)}> Test</Menu.Item>   
        </Menu>
        <div>
            {name}
        </div>
        <DragAndFillCard
            onDragStart = {dragStartHandler}
            onDrag = {dragHandler}
            id={'moduleCard'}
            romanNumeralName={'I'}
            chordName={labInfo && labInfo['chordLab'] && labInfo['chordLab']['name'] ? labInfo['chordLab']['name']: initState['chordLab']['name']}
            rhythmName={labInfo && labInfo['rhythmLab'] && labInfo['rhythmLab']['name'] ? labInfo['rhythmLab']['name']: initState['rhythmLab']['name']}
            patternName={labInfo && labInfo['patternLab'] && labInfo['patternLab']['name'] ? labInfo['patternLab']['name']: initState['patternLab']['name']}
            scaleName={labInfo && labInfo['scaleLab'] && labInfo['scaleLab']['scaleName'] ? labInfo['scaleLab']['name']: initState['scaleLab']['name']}
            countName={labInfo && labInfo['rhythmLab'] && labInfo['rhythmLab']['length'] ? labInfo['rhythmLab']['length'] : initState['rhythmLab']['length']}
            keyName={`Key: ${key}`}
            />
        <div>
            <h3>Name</h3>
            <Input type='text'
            value={name}
            onInput={e => setName(e.target.value)}
            />
        </div>
        </>
    )
    
}