import * as Tone from 'tone';
const timeConstant = Tone.Time('4n').toSeconds()

//======TIME RELATED FUNCTIONS
//====CREATES MODULE MARKERS FOR JUMPING BACK AND FORTH
export function moduleMarkerCreator(data){
    var moduleMarkers = [0]
    var count = 0;
    for (var i = 0; i < data[0]['data'].length; i++){
        var moduleDuration = ((data[0]['data'][i].speed * timeConstant * data[0]['data'][i].notes.length))
        moduleMarkers.push(moduleDuration + count)
        count += moduleDuration;
    }
    return moduleMarkers;
}
//====Variant of the original function
export function moduleMarkerCreatorCompact(data){
    var moduleMarkers = [0]
    var count = 0
    for (var i = 0; i < data.length -1; i++){
        var moduleDuration = ((data[i].speed * timeConstant * data[i].notes.length))
        moduleMarkers.push(moduleDuration + count)
        count += moduleDuration;
    }
    return moduleMarkers;
}

//====FINDS THE ENDPOINT OF A LOOP
export function loopLengthCreator(data){
    var loopLength = 0;
    for (var i = 0; i < data[0]['data'].length; i++){
        loopLength = loopLength + (data[0]['data'][i].speed * Tone.Time('4n').toSeconds() * data[0]['data'][i].notes.length)
    }
    loopLength = +loopLength.toFixed(2)
    return loopLength;
}

//=====FIND THE CURRENT MODULE BASED ON TIME

export function findBetween(number, list){
    var returnObj = {previous: undefined, next: undefined, playingIndex: undefined, current: undefined}
        for (var i = 1; i < list.length; i++){
            if (number <= list[0]){
                returnObj['previous'] = list[0]
                returnObj['current'] = list[0]
                returnObj['next'] = list[0] 
                returnObj['playingIndex'] = 0
            }

            if (number <= list[1]){
                returnObj['previous'] = list[0]
                returnObj['current'] = list[0]
                returnObj['next'] = list[1] 
                returnObj['playingIndex'] = 0
            }
            if (number >= list[list.length -1]){
                returnObj['previous'] = list[list.length -2];
                returnObj['current'] = list[list.length -1];
                returnObj['next'] = undefined;
                returnObj['playingIndex'] = list.length - 1;
                
            }
            if (number >= list[i - 1] && number <=list[i]){
                returnObj['previous'] = list[i - 2];
                returnObj['current'] = list[i - 1]
                returnObj['next'] = list[i] 
                returnObj['playingIndex'] = i - 1;
            }
        }
        return returnObj;
}

//===========Change Tone Transport Position
// timeNow = Tone.Time(Tone.Transport.position).toSeconds()
// Tone.Transport.state



