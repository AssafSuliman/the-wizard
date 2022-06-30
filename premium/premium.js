const trialDiv= document.querySelector('.trialChoice')
trialDiv.addEventListener('click',function(){
    showCurrentChoice(trialDiv)
    document.querySelector('.currentSelction')?.remove()
    trialDiv.append(buildSection(20,endTime('trial')))
})
const monthlyDiv=document.querySelector('.monthlyChoice')
monthlyDiv.addEventListener('click',function(){
    showCurrentChoice(monthlyDiv)
    document.querySelector('.currentSelction')?.remove()
    monthlyDiv.append(buildSection(80,endTime('monthly')))
})
const annualDiv=document.querySelector('.annualChoice')
annualDiv.addEventListener('click',function(){
    showCurrentChoice(annualDiv)
    document.querySelector('.currentSelction')?.remove()
    annualDiv.append(buildSection(120,endTime('annual')))
})
function buildSection(moneyAmount,endTime){
    const section= document.createElement('section')
    section.classList= 'currentSelction'
    const money= document.createElement('p')
    money.classList='price'
    money.textContent= `total pay: ${moneyAmount}`
    const end= document.createElement('p')
    end.textContent=`the end for this package ${endTime}`
    const adventage= document.createElement('p')
    adventage.textContent= '✅ adding as many photos as you wish for your wizard'
    section.append(money,end,adventage)
    document.querySelector('#price').textContent= moneyAmount
    return section
}
function endTime(name){
    const date = new Date()
    let year= date.getFullYear()
    let month= date.getMonth()+1
    let day= date.getDate()
    if(name=='trial'){
        const maxDaysForThisMonth= daysInMonth(month,year)
        let newDay= day+14
        if (newDay>maxDaysForThisMonth){
            day= newDay-maxDaysForThisMonth
            month++
        }
        return `${day}/${month}/${year}`
    }//2weeks
    else if(name=='monthly'){
        return `${day}/${month+1}/${year}`
    }
    else if(name=='annual'){
        return `${day}/${month}/${year+1}`
    }
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function showCurrentChoice(element){
    document.querySelector('.coiceSelected')?.classList.remove('coiceSelected')
    element.classList.add('coiceSelected')
}
const continueBtn= document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`)
document.querySelector('#previousButton').setAttribute('href', `${document.location.origin}/the-wizard/entrance-screen/entrance.html`)
continueBtn.addEventListener('submit',function(e){
    e.preventDefault
    localStorage.setItem('DecidedPrimium','checked')
})