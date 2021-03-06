export const initialData = [
    {
        chordData: {
            chordName: 'CM',
            chord: ['C3', 'E3', 'G3'],
        },
        rhythmData: {
            rhythmName: 'Default: Str 8s',
            rhythm: [['O', 'O'], ['O', 'O'], ['O', 'O'], ['O', 'O']],
        },
        patternData: {
            patternName: 'Pattern: Arp Run',
            pattern: [0, [2, 4, 6], -10, [8, 10, 12], 10, 12, 14, 16],
        },
        scaleData: {
            scaleName: 'C Ionian',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
        keyData: {
            keyName: 'Key: C',
            root: 'C'
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Dm',
            chord: ['D3', 'F3', 'A3'],
        },
        rhythmData: {
            rhythmName: 'Hard Swing',
            rhythm: [['O', 'X', 'O'], ['O', 'X', 'O'], ['O', 'X', 'O'], ['O', 'X', 'O']],
        },
        patternData: {
            patternName: 'Pattern: normal variation',
            pattern: [1, 4, 1, 8, 2, 12, 8, 7],
        },
        scaleData: {
            scaleName: 'D Dorian',
            scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
        },
        keyData: {
            keyName: 'Key: C',
            root: 'C'
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Em',
            chord: ['E3', 'G3', 'B3'],
        },
        rhythmData: {
            rhythmName: 'Whole, Half-Half, Triplet, Quarter-Stop-Quarter-Stop',
            rhythm: [['O'], ['O', 'O'], ['O', 'O', 'O'], ['O', 'X', 'O', 'X']],
        },
        patternData: {
            patternName: 'Pattern: scale run and return',
            pattern: [5, 4, 12, 3, 1, 4, -1, 10],
        },
        scaleData: {
            scaleName: 'E Phrygian',
            scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
        },
        keyData: {
            keyName: 'Key: C',
            root: 'C'
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
];

export const initialData2 = [
    {
        chordData: {
            chordName: 'Cmaj',
            chord: ['C3', 'E3', 'G3'],
        },
        rhythmData: {
            rhythmName: 'Default: Str 8s',
            rhythm: [['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3']],
        },
        patternData: {
            patternName: 'Pattern: Arp Run',
            pattern: [0, [2, 4, 6], 4, [8, 10, 12], 10, 12, 14, 16],
        },
        scaleData: {
            scaleName: 'C Ionian',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
        keyData: {
            keyName: 'Key: C Major',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: [0,0,0,0,0,0,0,0]
    },
    {
        chordData: {
            chordName: 'Dmin',
            chord: ['D3', 'F3', 'A3'],
        },
        rhythmData: {
            rhythmName: 'Hard Swing',
            rhythm: [['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3']],
        },
        patternData: {
            patternName: 'Pattern: normal variation',
            pattern: [1, 4, 1, 8, 2, 12, 8, 7],
        },
        scaleData: {
            scaleName: 'D Dorian',
            scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
        },
        keyData: {
            keyName: 'Key: C Major',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: [0,0,0,0,0,0,0,0],
    },
    {
        chordData: {
            chordName: 'Emin',
            chord: ['E3', 'G3', 'B3'],
        },
        rhythmData: {
            rhythmName: 'Whole, Half-Half, Triplet, Quarter-Stop-Quarter-Stop',
            rhythm: [['C3'], ['C3', 'C3'], ['C3', 'C3', 'C3'], ['C3', 'X', 'C3', 'X']],
        },
        patternData: {
            patternName: 'Pattern: scale run and return',
            pattern: [5, 4, 12, 3, 1, 4, -1, 10],
        },
        scaleData: {
            scaleName: 'E Phrygian',
            scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
        },
        keyData: {
            keyName: 'Key: C Major',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '5',
            count: 5,
        },
        output: [],
        position: [0,0,0,0,0,0,0,0],
    },
];

export const initialData3 = [
    {name:'Guitar 1',
    mode: 'melody',
    displayOnly: true,
    data: [{
        chordData: {
            chordName: 'Cmaj',
            chord: ['C3', 'E3', 'G3'],
        },
        rhythmData: {
            rhythmName: 'Default: Str 8s',
            rhythm: [['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3']],
        },
        patternData: {
            patternName: 'Pattern: Arp Run',
            pattern: [0, [2, 4, 6], 4, [8, 10, 12], 10, 12, 14, 16],
        },
        scaleData: {
            scaleName: 'C Ionian',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Dmin',
            chord: ['D3', 'F3', 'A3'],
        },
        rhythmData: {
            rhythmName: 'Hard Swing',
            rhythm: [['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3']],
        },
        patternData: {
            patternName: 'Pattern: normal variation',
            pattern: [1, 4, 1, 8, 2, 12, 8, 7],
        },
        scaleData: {
            scaleName: 'D Dorian',
            scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Emin',
            chord: ['E3', 'G3', 'B3'],
        },
        rhythmData: {
            rhythmName: 'Whole, Half-Half, Triplet, Quarter-Stop-Quarter-Stop',
            rhythm: [['C3'], ['C3', 'C3'], ['C3', 'C3', 'C3'], ['C3', 'X', 'C3', 'X']],
        },
        patternData: {
            patternName: 'Pattern: scale run and return',
            pattern: [5, 4, 12, 3, 1, 4, -1, 10],
        },
        scaleData: {
            scaleName: 'E Phrygian',
            scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
        },
        output: [],
        position: []
    },]},
    {name:'Guitar 2',
    mode: 'melody',
    dispalyOnly: true,
    data: [{
        chordData: {
            chordName: 'Cmaj',
            chord: ['C3', 'E3', 'G3'],
        },
        rhythmData: {
            rhythmName: 'Str 4s',
            rhythm: [['C3'], ['C3'], ['C3'], ['C3']],
        },
        patternData: {
            patternName: 'Full Chord:0,2,4',
            pattern: [[0, 2, 4], [0, 2, 4], [0, 2, 4], [0, 2, 4]],
        },
        scaleData: {
            scaleName: 'C Ionian',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Dmin',
            chord: ['D3', 'F3', 'A3'],
        },
        rhythmData: {
            rhythmName: 'Str 4s',
            rhythm: [['C3'], ['C3'], ['C3'], ['C3']],
        },
        patternData: {
            patternName: 'Full Chord:0,2,4',
            pattern: [[0, 2, 4], [0, 2, 4], [0, 2, 4], [0, 2, 4]],
        },
        scaleData: {
            scaleName: 'D Dorian',
            scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'Emin',
            chord: ['E3', 'G3', 'B3'],
        },
        rhythmData: {
            rhythmName: 'Str 4s',
            rhythm: [['C3'], ['C3'], ['C3'], ['C3']],
        },
        patternData: {
            patternName: 'Full Chord:0,2,4',
            pattern: [[0, 2, 4], [0, 2, 4], [0, 2, 4], [0, 2, 4]],
        },
        scaleData: {
            scaleName: 'E Phrygian',
            scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
        },
        countData: {
            countName: '5',
            count: 5,
        },
        output: [],
        position: []
    },]},
        
];

export const initialData4 = [
    {
        chordData: {
            chordName: 'Cmaj',
            chord: ['C3', 'E3', 'G3'],
        },
        rhythmData: {
            rhythmName: 'NEW',
            rhythm: [['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3'], ['C3', 'C3']],
        },
        patternData: {
            patternName: 'NEW',
            pattern: [0, [2, 4, 6], -10, [8, 10, 12], 10, 12, 14, 16],
        },
        scaleData: {
            scaleName: 'NEW',
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
        keyData: {
            keyName: 'NEW',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'NEW',
            chord: ['D3', 'F3', 'A3'],
        },
        rhythmData: {
            rhythmName: 'NEW',
            rhythm: [['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3'], ['C3', 'X', 'C3']],
        },
        patternData: {
            patternName: 'NEW',
            pattern: [1, 4, 1, 8, 2, 12, 8, 7],
        },
        scaleData: {
            scaleName: 'NEW',
            scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
        },
        keyData: {
            keyName: 'NEW',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '4',
            count: 4,
        },
        output: [],
        position: []
    },
    {
        chordData: {
            chordName: 'NEW',
            chord: ['E3', 'G3', 'B3'],
        },
        rhythmData: {
            rhythmName: 'NEW',
            rhythm: [['C3'], ['C3', 'C3'], ['C3', 'C3', 'C3'], ['C3', 'X', 'C3', 'X']],
        },
        patternData: {
            patternName: 'NEW',
            pattern: [5, 4, 12, 3, 1, 4, -1, 10],
        },
        scaleData: {
            scaleName: 'NEW',
            scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
        },
        keyData: {
            keyName: 'NEW',
            root: 'C',
            type: 'Major',
        },
        countData: {
            countName: '5',
            count: 5,
        },
        output: [],
        position: []
    },
];

export const initialDataType2 = [
    {   
        name: '1',
        moduleName: '1',
        desc: '',
        author: '',
        authorId: '',
        dataType: 'module',
        pool: '',
        data: {
            chordData: {
                chordName: 'Dm',
                name: 'Dm',
                desc: '',
                chord: ['D3', 'F3', 'A3'],
                position: []
            },
            rhythmData: {
                name: 'Str8 8s',
                rhythmName: 'Str8 8s',
                rhythm: [['O', 'O'], ['O', 'O'], ['O', 'O'], ['O', 'O']],
                speed: 1,
                desc: '',
                length: 4,
                notes: 8
            },
            patternData: {
                name: 'Arp up-Scale Down',
                patternName: 'Arp up-Scale Down',
                pattern: [[0], [2], [4], [7], [6], [5], [4], [3]],
                type: 'fluid',
                desc: '',
                length: 8,
                position: [0, 0, 0, 0, 0, 0, 0, 0],
                positionType: 'unlocked'
            },
            scaleData: {
                scaleName: 'D Dorian',
                name: 'D Dorian',
                desc: '',
                scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C'],
                binary: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
                length: 7,
                number: 2902
            },
            keyData: {
                keyName: 'Key: C',
                root: 'C'
            },
        }
    },
    {   
        name: '2',
        moduleName: '2',
        desc: '',
        author: '',
        authorId: '',
        dataType: 'module',
        pool: '',
        data: {
            chordData: {
                name: 'GM',
                chordName: 'GM',
                desc: '',
                chord: ['G3', 'B3', 'D4'],
                position: []
            },
            rhythmData: {
                rhythmName: 'Str8 8s',
                rhythm: [['O', 'O'], ['O', 'O'], ['O', 'O'], ['O', 'O']],
                speed: 1,
                desc: '',
                length: 4,
                notes: 8
            },
            patternData: {
                name: 'Arp up-Scale Down',
                patternName: 'Arp up-Scale Down',
                pattern: [[0], [2], [4], [7], [6], [5], [4], [3]],
                type: 'fluid',
                desc: '',
                length: 8,
                position: [1, 1 , 1, 1, 1, 1, 1, 1],
                positionType: 'unlocked'
            },
            scaleData: {
                scaleName: 'G Mixolydian',
                name: 'G Mixolydian',
                desc: '',
                scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
                binary: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                number: 2774,
                length: 7,
            },
            keyData: {
                keyName: 'Key: C',
                name: 'Key: C',
                root: 'C'
            },
        }
    },
    {
        name: '3',
        moduleName: '3',
        desc: '',
        author: '',
        authorId: '',
        dataType: 'module',
        pool: '',
        data: {
            chordData: {
                chordName: 'CM',
                name: 'CM',
                chord: ['C3', 'E3', 'G3'],
                desc: '',
                position: []
            },
            rhythmData: {
                rhythmName: 'Str8 8s',
                rhythm: [['O', 'O'], ['O', 'O'], ['O', 'O'], ['O', 'O']],
                desc: '',
                speed: 1,
                length: 4,
                notes: 8
            },
            patternData: {
                name: 'Arp up-Scale Down',
                patternName: 'Arp up-Scale Down',
                pattern: [[0], [2], [4], [7], [6], [5], [4], [3]],
                desc: '',
                type: 'fluid',
                position: [2, 2, 2, 2, 2, 2, 2, 2],
                length: 8,
                positionType: 'unlocked'
            },
            scaleData: {
                scaleName: 'C Major',
                name: 'C Major',
                desc: '',
                scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                binary: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
                length: 7,
                number: 2773
            },
            keyData: {
                keyName: 'Key: C',
                name: 'Key: C',
                root: 'C'
            },
        }  
    },
    {
        name: '4',
        moduleName: '4',
        desc: '',
        author: '',
        authorId: '',
        dataType: 'module',
        pool: '',
        data: {
            chordData: {
                chordName: 'CM',
                name: 'CM',
                chord: ['C3', 'E3', 'G3'],
                desc: '',
                position: [],
                positionType: 'unlocked'
            },
            rhythmData: {
                rhythmName: 'Str8 8s',
                rhythm: [['O', 'O'], ['O', 'O'], ['O', 'O'], ['O', 'O']],
                speed: 1,
                desc: '',
                length: 4,
                notes: 8
            },
            patternData: {
                name: 'Arp up-Scale Down',
                patternName: 'Arp up-Scale Down',
                pattern: [[0], [2], [4], [7], [6], [5], [4], [3]],
                type: 'fluid',
                desc: '',
                length: 8,
                position: [3, 3, 3, 3, 3, 3, 3, 3],
                positionType: 'unlocked'
            },
            scaleData: {
                scaleName: 'C Major',
                name: 'C Major',
                desc: '',
                scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                length: 7,
                binary: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
                number: 2773
            },
            keyData: {
                keyName: 'Key: C',
                root: 'C'
            },
        }  
    },    
]