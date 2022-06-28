function saveEntranceData () {
    localStorage.setItem('agree', 'checked')
}
function getEntranceData () {

}
function savePhase1Data (phase1Data) {
    localStorage.setItem('phase1Data', JSON.stringify(phase1Data))
}
function getPhase1Data (){
    return localStorage.getItem('phase1Data')
}
