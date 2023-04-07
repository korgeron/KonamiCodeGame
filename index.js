//BUGS TO FIX//
//(1) DOESN'T PLAY SOUND EFFECTS EVERY TIME FOR CORRECT INPUT
$(function () {
    "use strict";
    $('.text-alert').css('color', 'rgb(0,0,0,0)');   //SETS ALERT TEXT TO INVISIBLE
    let life = 0;
    let level = 0;
    $('.current-level').html('lv: ' + level).css('color', 'rgb(0,0,0,0)');  //SETS CURRENT LEVEL
    let bucket = [];
    $('.life-class').html('LIFE: ' + (life + 1)); //SETS LIFE TO STARTING VALUE

    $(document).keyup(function (event) {
        bucket.push(event.key);    //PUSHES KEYS PRESSED TO THE BUCKET
        let str = bucket.toString().toLowerCase(); //WAS HAVING ISSUES USING VALUES SO CONVERTED TO A STRING
        if (str === 'arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a') {
            $('#my-audio')[0].play(); //AUDIO FOR CORRECT INPUT
            life += 30;  //IF CORRECT CODE ENTERED THEN ADDED 30 LIVES
            level += 1; // ADDS NEXT LEVEL TO GAMEBOY
            $('.current-level').html('lv: ' + level).css('color','black'); //ADDING WIN CAPABILITIES / FUNCTIONALITY
            $('body').css('background', 'lightgreen');
            $('#lives').html('LIFE: ' + life);
            bucket = [];
            if ($('#my-alert').css('color', 'red')) { //SETS WORDS TO RED AND THEN SETS TIMER
                setTimeout(function () {
                    $('.text-alert').css('color', 'rgb(0,0,0,0)');
                    $('body').css('background', 'white');
                }, 1500) //TIMER FOR ALERT FADE
            }
        }
        if (str.length >= 81 && str !== 'arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a') {  //IF CODE DOESNT EQUAL DESIRED CODE IT RESETS THE BUCKET AND PLAYS THE RESET AUDIO
            $('#audio-recharge')[0].play();
            return bucket = [];
        }
        if (life > 1) { //THIS SUBTRACTS THE LIFE OVER TIME / ALSO SPEEDS UP OVER TIME
            let subtractLife = setInterval(function () {
                console.log('take away life timer');
                life -= 1;
                $('.life-class').html('LIFE: ' + life);
                if (level === 6) { //WIN FUNCTIONALITY
                    life = 1; //THIS FIXED ISSUE OF BOTH WIN AND LOSS SOUNDS PLAYING ON WIN
                    $('document').off(event);
                    $('#audio-game-won')[0].play();
                    clearInterval(subtractLife);
                    $('#lives').css('color', 'rgba(245,191,8,0.61)').html('YOU WIN!');
                    setTimeout(function () {
                        $('window').html(location.reload());
                    }, 5000) //TIMER FOR PAGE RELOAD EVENT ON WIN
                }
                if (life < 0) { //DEATH EVENT / REFRESH PAGE EVENT
                    $('document').off(event);
                    clearInterval(subtractLife);
                    let sayDead = 'YOU DIED!'
                    $('.life-class').css('color', 'orange').html(sayDead);

                    $('#audio-game-over')[0].play();

                    setTimeout(function () {
                        $('window').html(location.reload());
                    }, 3000) //TIMER FOR PAGE RELOAD EVENT ON LOSS
                }
            }, 1000) //1000
        }
        $('.my-keys').html(event.key); //SHOWS WHAT KEYS HAVE BEEN PRESSED
    });
});