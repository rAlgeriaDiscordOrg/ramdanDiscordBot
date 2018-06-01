let ramadanSahaButton = document.getElementById('ramadanSahaButton');
let ramadanSahaThankingButton = document.getElementById('ramadanSahaThankingButton');
let showDiv = document.getElementById('show');

let ramadanBot = new Ramadan(***REMOVED***
    sahaRamdankTime: ['00:04:00'],
    sahaFtourekTime: [***REMOVED***
        time: '01:36:00',
        effectiveRange: 6 * 3600 // in sec
  ***REMOVED***],
    sahaShourekTime: [***REMOVED***
            hours: 1,
            minutes: 36,
            seconds: 30
      ***REMOVED***,
        ***REMOVED***
            hours: 3,
            minutes: 0,
            seconds: 0,
            effectiveRange: 3600        
      ***REMOVED***
    ],
    checkTimeInterval: 5000, // half an hour
    ramadanStartDay: new Date('2018-05-17'),
    ramadanEndDay: new Date('2018-06-17'),
    ramadanLaylatCheckDay: new Date('2018-06-15'),
    print: ***REMOVED***
        mod: 'callback&consoleLog',
        callback: function (msg, dt) ***REMOVED***
            //console.log("dt )= " + dt);
            if(typeof dt === 'undefined') ***REMOVED***
                let linesLength =  showDiv.getElementsByTagName('span').length;
                //console.log("lenglth : " + linesLength);
                if(linesLength % 2 === 0) ***REMOVED***
                    showDiv.innerHTML += '<br> <span class="even">' + msg+'</span>';   
              ***REMOVED*** else ***REMOVED***
                    showDiv.innerHTML += '<br> <span class="odd">' + msg+'</span>';   
              ***REMOVED***
          ***REMOVED*** else if(dt === 'stop' || dt === 'start') ***REMOVED***
                showDiv.innerHTML = msg;
          ***REMOVED***
            showDiv.className = 'annimate';
            setTimeout(() => ***REMOVED***
                showDiv.className = '';
          ***REMOVED***, 400);
            showDiv.scrollTop = showDiv.scrollHeight;
      ***REMOVED***
  ***REMOVED***
});


ramadanSahaButton.addEventListener('click' , function () ***REMOVED***
    if(ramadanBot.getRamadanSahaState() === false) ***REMOVED***
        ramadanBot.startRamadanSaha();
        ramadanSahaButton.innerHTML = 'stop RamadanSaha';
  ***REMOVED*** else ***REMOVED***
        ramadanBot.stopRamadanSaha();
        ramadanSahaButton.innerHTML = 'start RamadanSaha';
  ***REMOVED*** 
});

ramadanSahaThankingButton.addEventListener('click' , function () ***REMOVED***
    if(ramadanBot.getRamadanSahaAndThankingState() === false) ***REMOVED***
        ramadanBot.startRamadanSahaAndThanking('Thank you Menad my dear friend');
        ramadanSahaThankingButton.innerHTML = 'stop RamadanSahaAndThanking';
  ***REMOVED*** else ***REMOVED***
        ramadanBot.stopRamadanSahaAndThanking();
        ramadanSahaThankingButton.innerHTML = 'start RamadanSahaAndThanking';
  ***REMOVED*** 
});