import React, {useState} from 'react'
import { Tab, List, Button, Segment, Icon } from 'semantic-ui-react' 
import './palette.css'

export default function Palette({display}) {
    const activeTabStates = [
        "Components",
        // "Collections",
        // "Songs",
    ]

    const activeSubTabStates = [
        "Modules",
        "Scales",
        "Chords",
        "Patterns",
        "Rhythms",
        "Keys"
    ]

    const keyList = [
        {
            keyName: 'Key: C',
            root: 'C'
        },
        {
            keyName: 'Key: C#',
            root: 'C#'
        },
        {
            keyName: 'Key: Db',
            root: 'Db'
        },
        {
            keyName: 'Key: D',
            root: 'D'
        },
        {
            keyName: 'Key: D#',
            root: 'D#'
        },
        {
            keyName: 'Key: Eb',
            root: 'Eb'
        },
        {
            keyName: 'Key: E',
            root: 'E'
        },
        {
            keyName: 'Key: F',
            root: 'F'
        },
        {
            keyName: 'Key: F#',
            root: 'F#'
        },
        {
            keyName: 'Key: Gb',
            root: 'Gb'
        },
        {
            keyName: 'Key: G',
            root: 'G'
        },
        {
            keyName: 'Key: G#',
            root: 'G#'
        },
        {
            keyName: 'Key: Ab',
            root: 'Ab'
        },
        {
            keyName: 'Key: A',
            root: 'A'
        },
        {
            keyName: 'Key: A#',
            root: 'A#'
        },
        {
            keyName: 'Key: Bb',
            root: 'Bb'
        },
        {
            keyName: 'Key: B',
            root: 'B'
        },

    ]

    var [storage, setStorage] = useState(
        {
            "Components": {
                "Modules": [],
                "Scales": [],
                "Chords": [],
                "Patterns": [],
                "Rhythms": [],
                "Keys": keyList,
            },
            "Collections": {
                "Modules": ['A Module Collection', 'B Module Collection'],
                "Chords": ['Chord Collections'],
                "Patterns": ['Pattern Collections'],
                "Rhythms": ['Rhythm Collections'],
            },
            "Songs": []
        }
    )

    const [activeTab, setActiveTab] = useState(0)
    const [activeSubTab, setActiveSubTab] = useState(1)

    const handleDeleteItem = (idx) => {
        let cloneStorage = JSON.parse(JSON.stringify(storage))
        let subState = activeSubTabStates[activeSubTab]
        let subArr = cloneStorage['Components'][subState]
        subArr.splice(idx, 1)
        setStorage(cloneStorage)
    }

    function mapRegularComponents(arr, type){
        var name;
        var dataClass;
        let color;
        var groupTag;
        if (activeTab !== 0){
            return
        }
        if (type === 'Scales'){
            groupTag = 'scales'
            name = 'scaleName'
            dataClass = 'scaleData'
            color = 'lightcoral'
        } else if (type === 'Chords'){
            groupTag = 'chords'
            name = 'chordName'
            dataClass = 'chordData'
            color = 'lightsalmon'
        } else if (type === 'Patterns'){
            groupTag = 'patterns'
            name = 'patternName'
            dataClass = 'patternData'
            color = 'lightblue'
        } else if (type === 'Rhythms'){
            groupTag = 'rhythms'
            name = 'rhythmName'
            dataClass = 'rhythmData'
            color = 'lightseagreen'
        } else if (type === 'Modules'){
            groupTag = 'modules'
            name = 'moduleName'
            dataClass = 'moduleData'
            color = 'wheat'
        } else if (type === 'Keys'){
            groupTag = 'keys'
            name = 'keyName'
            dataClass = 'keyData'
            color = 'teal'
        }
        
        else {
            return
        } 

        return (
            arr.map((item, idx) => 
            <div 
            id={'palette_' + groupTag + '_' + idx} 
            key={'palette_' + groupTag + '_' + idx} 
            draggable 
            onDragStart = {dragStartHandler} 
            onDrag = {dragHandler} 
            onDragOver = {dragOverHandler} 
            onDragLeave={dragLeaveHandler} 
            onDrop = {dropHandler}  
            className={dataClass} 
            style={{marginTop: '10px', 
            marginBottom: '10px',
            height: '25px', 
            width: '175px',
            backgroundColor: color, 
            display:'flex', 
            flexDirection:'row', 
            justifyContent: 'space-between'}}
            >
            <div>
            {item[name]}
            </div>
            <div>
            {dataClass !== 'keyData' && <Icon onClick={() => handleDeleteItem(idx)} name='times'/>}
            </div>
            </div>
            )
        )
            
    }

    function mapSongs(){
        return (
            storage['Songs'].map((song, idx) => 
            <div id={'palette_song_' + idx} key={'palette_song_'+ idx} draggable onDragStart = {dragStartHandlerSong} onDrag = {dragHandler} onDragOver = {dragOverHandler} onDragLeave={dragLeaveHandler} onDrop = {dropHandler}  className='songData' style={{marginTop: '10px', marginBottom: '10px', height: '25px', width: '175px',backgroundColor:'wheat'}}>{song}</div>
            )
        )
    }

    function onClickHandler(direction, type){
        if (direction === 'right'){
            if (type === 'tab'){
                if (activeTab !== activeTabStates.length - 1){
                    setActiveTab(activeTab + 1)
                } else {
                    setActiveTab(0)
                }
            }
            if (type === 'subTab'){
                if (activeSubTab !== activeSubTabStates.length - 1){
                    setActiveSubTab(activeSubTab + 1)
                } else {
                    setActiveSubTab(0)
                }
            }
        }
        if (direction === 'left'){
            if (type === 'tab'){
                if (activeTab !== 0){
                    setActiveTab(activeTab - 1)
                } else {
                    setActiveTab(activeTabStates.length -1)
                }
            }
            if (type === 'subTab'){
                if (activeSubTab !== 0){
                    setActiveSubTab(activeSubTab - 1)
                } else {
                    setActiveSubTab(activeSubTabStates.length - 1)
                }
            }
        }
        

    }

    const dragStartHandler = e => {
        var ex = e.target.id.split('_');
        var pos = Number(ex[2])
        var exportType;
        if (e.target.className === 'moduleData'){
            exportType = 'modulePaletteExport'
        } else {
            exportType = 'palette'
        }
        var obj = {id: 'special', className: e.target.className, message: 
        storage[activeTabStates[activeTab]][activeSubTabStates[activeSubTab]][pos],
         type: exportType}

        e.dataTransfer.setData('text', JSON.stringify(obj));
    };

    const dragStartHandlerSong = e => {

    }

    const dragHandler = e => {
    };

    const dragOverHandler = e => {
        e.preventDefault();
    }

    const dragLeaveHandler = e => {
        e.preventDefault();
    }
   
    const dropHandler = e => {
        var cloneStorage = JSON.parse(JSON.stringify(storage))
        var data = JSON.parse(e.dataTransfer.getData("text"));
        if (data['type'] !== 'palette' && data['type'] !== 'modulePaletteExport'){
           if (data['className'] === 'chordData'){
            cloneStorage['Components']['Chords'].push(data['message'])
            setActiveTab(0)
            setActiveSubTab(2)
           } else if (data['className'] === 'rhythmData'){
            cloneStorage['Components']['Rhythms'].push(data['message'])
            setActiveTab(0)
            setActiveSubTab(4)
           } else if (data['className'] === 'patternData'){
            cloneStorage['Components']['Patterns'].push(data['message'])
            setActiveTab(0)
            setActiveSubTab(3)
           } else if (data['className'] === 'scaleData'){
            cloneStorage['Components']['Scales'].push(data['message'])
            setActiveTab(0)
            setActiveSubTab(1)
           } else if (data['className'] === 'moduleData'){
            cloneStorage['Components']['Modules'].push(data['message'])
            setActiveTab(0)
            setActiveSubTab(0)
           } else {
               return
           }
        } else {
            return
        }
        setStorage(cloneStorage)
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        e.dataTransfer.clearData();
        
        
    }

    return (
        <>
        <div style={{display: display ? '' : 'none'}} onDrop={dropHandler} onDragOver={dragOverHandler}>
         <List relaxed divided size='large' className='fixed-width'>
        <div style={{display:'flex', flexDirection:'column'}}>
        {/* <Button.Group className='no-padding'>
            <Button compact basic onClick={() => onClickHandler('left', 'tab')}> <Icon name ='left arrow'/></Button>
            <Segment>
            {activeTabStates[activeTab]}
            </Segment>
            <Button compact basic onClick={() => onClickHandler('right', 'tab')}> <Icon name ='right arrow'/></Button>
        </Button.Group> */}
        {activeTab !== 1 && 
        <Button.Group className='no-padding'>
            <Button compact basic onClick={() => onClickHandler('left', 'subTab')}> <Icon name ='left arrow'/></Button>
            <Segment>
            &nbsp;&nbsp;&nbsp;&nbsp;{activeSubTabStates[activeSubTab]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Segment>
            <Button compact basic onClick={() => onClickHandler('right', 'subTab')}> <Icon name ='right arrow'/></Button>
        </Button.Group>}
        </div>
        <List.Item className='Item'>
            {/* <List.Icon name='clock' size='large' verticalAlign='middle' /> */}
            <List.Content>
                {/* <List.Header> {activeTab !== 1 ? activeSubTabStates[activeSubTab] : 'Songs'}</List.Header> */}
                <List.Description>
                    {activeTab !== 1 &&
                    <div >
                    {mapRegularComponents(storage[activeTabStates[activeTab]][activeSubTabStates[activeSubTab]], activeSubTabStates[activeSubTab])}
                    </div>}
                    {/* {activeTab === 1 &&
                    <div>
                        {mapSongs()}
                    </div>} */}
                </List.Description>
            </List.Content>
        </List.Item>
        </List>
        </div>
        </>
    )
}
