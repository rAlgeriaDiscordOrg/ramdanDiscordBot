let ramadanSahaButton = document.getElementById('ramadanSahaButton');
let ramadanSahaThankingButton = document.getElementById('ramadanSahaThankingButton');
let showDiv = document.getElementById('show');

let ramadanBot = new Ramadan({
    sahaRamdankTime: ['00:04:00'],
    sahaFtourekTime: [{
        time: '01:36:00',
        effectiveRange: 6 * 3600 // in sec
    }],
    sahaShourekTime: [{
            hours: 1,
            minutes: 36,
            seconds: 30
        },
        {
            hours: 3,
            minutes: 0,
            seconds: 0,
            effectiveRange: 3600        
        }
    ],
    checkTimeInterval: 5000, // half an hour
    ramadanStartDay: new Date('2018-05-17'),
    ramadanEndDay: new Date('2018-06-17'),
    ramadanLaylatCheckDay: new Date('2018-06-15'),
    print: {
        mod: 'callback&consoleLog',
        callback: function (msg, dt) {
            //console.log("dt )= " + dt);
            if(typeof dt === 'undefined') {
                let linesLength =  showDiv.getElementsByTagName('span').length;
                //console.log("lenglth : " + linesLength);
                if(linesLength % 2 === 0) {
                    showDiv.innerHTML += '<br> <span class="even">' + msg+'</span>';   
                } else {
                    showDiv.innerHTML += '<br> <span class="odd">' + msg+'</span>';   
                }
            } else if(dt === 'stop' || dt === 'start') {
                showDiv.innerHTML = msg;
            }
            showDiv.className = 'annimate';
            setTimeout(() => {
                showDiv.className = '';
            }, 400);
            showDiv.scrollTop = showDiv.scrollHeight;
        }
    }
});


ramadanSahaButton.addEventListener('click' , function () {
    if(ramadanBot.getRamadanSahaState() === false) {
        ramadanBot.startRamadanSaha();
        ramadanSahaButton.innerHTML = 'stop RamadanSaha';
    } else {
        ramadanBot.stopRamadanSaha();
        ramadanSahaButton.innerHTML = 'start RamadanSaha';
    } 
});

ramadanSahaThankingButton.addEventListener('click' , function () {
    if(ramadanBot.getRamadanSahaAndThankingState() === false) {
        ramadanBot.startRamadanSahaAndThanking('Thank you Menad my dear friend');
        ramadanSahaThankingButton.innerHTML = 'stop RamadanSahaAndThanking';
    } else {
        ramadanBot.stopRamadanSahaAndThanking();
        ramadanSahaThankingButton.innerHTML = 'start RamadanSahaAndThanking';
    } 
});