let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let wakeLock;
const acquireWakeLock = async () => 
{
	try 
    {
		wakeLock = await navigator.wakeLock.request('screen');
		console.log('Wake lock is activated.');
	} catch (err)
     {
		console.log(err);
	}
}
const releaseWakeLock = async () => {
	try {
		wakeLock.release();
		console.log('Wake lock has been released.');
	} catch (err) {
		console.log(err);
	}
}
const music_list = [
{
        img : 'https://images.unsplash.com/photo-1654665052117-10a57bf55961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9uZSUyMHRodWdzJTIwYW5kJTIwaGFybW9ueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        name : '1st of Tha Month',
        artist : 'Bone Thugs and Harmony',
        music : 'https://audio.jukehost.co.uk/4vPwQjoPmZEuAA8PivBKZEUWx4KCHhz9'
    },

    {
        img : 'https://tse3.explicit.bing.net/th?id=OIP.N5iy1N9x0EKdG_56NebedgHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Bosses Daughter',
        artist : 'Pop Evil',
        music : 'https://audio.jukehost.co.uk/f17Gj27Wg7A5PXRmXSARf5BqNxuMsDGl'
    },

    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.zzvNMLX3IJsndkVaAekvlAHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Epitath',
        artist : 'Pop Evil',
        music : 'https://audio.jukehost.co.uk/l5bRJ40ySwGLTs2kFuPi1abQ4TPOsaGm'
    },
    
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.YJf9HgsI07QxF1uNDhi7UAHaGR&pid=Api&P=0&w=300&h=300',
        name : '100 In a 55',
        artist : 'Pop Evil',
        music : 'https://audio.jukehost.co.uk/YAvmzvWmnnezWjVcGvLGYilXIEz8acSp'
    },
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.Wi7YJqs55whTWJLw8oqF7gAAAA&pid=Api&P=0&w=300&h=300',
        name : 'Addicted',
        artist : 'Saving Abel',
        music : 'https://audio.jukehost.co.uk/EbsB6CyhOgI4LGwsMp8XGXSydI8ih7Op'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.5iZPOI2X4_ppKeCE2slWzgHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Bleed It Out',
        artist : 'Linkin Park',
        music : 'https://audio.jukehost.co.uk/9INoDMAvYkj7TekztPy53tll1DmuHDeu'
    },
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.DfvQKj5cObgYf1NcSlK67AHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Burn It to the Ground',
        artist : 'Nickelback',
        music : 'https://audio.jukehost.co.uk/6CUInkeNx2MUvSFM1IRKYxXV8dnH8BXD'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.6VEsbU-Ji9emS0jxNC34aQHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Change The World',
        artist : 'Finger Eleven',
        music : 'https://audio.jukehost.co.uk/EQvViyqGbJUIRO5kUxiCJ9bmibXwDBzt'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.2SSo-Z-AGGAwuCHTz2XDZQHaHS&pid=Api&P=0&w=300&h=300',
        name : 'Cherry Pie',
        artist : 'Warrant',
        music : 'https://audio.jukehost.co.uk/BYu53rcZI627mkv5EdEklOiL75ObRrS2'
    },
    {
        img : 'https://tse1.mm.bing.net/th?id=OIP.EfHlwrcyMh4feca8utCUXwHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Chop Suey!',
        artist : 'System of a Down',
        music : 'https://audio.jukehost.co.uk/2OQF3BLJADFy5TqqRqxeoOnEnP9Q3wQU'
    },
    {
        img : 'https://tse1.mm.bing.net/th?id=OIP.Abq4vFqP2IjdWOG0Zkn-lQHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Dark Light',
        artist : 'HIM',
        music : 'https://audio.jukehost.co.uk/yeDdvkqaHmd4w0iO9G0xHard4x93PwB8'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.-hW5gH1m4erop347OVxzAAHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Day of The Dead',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/bUvjnLsohU8P80ipeT3MDQxC5VhzXoa3'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.CxiwQJ1hcv-E2XCXs-uuQwHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Deal with the Devil',
        artist : 'Pop Evil',
        music : 'https://audio.jukehost.co.uk/Qu7OkKvGAwFXPwYK0qhWwQkyMmEWYG7a'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.X8_rdz4do7X3aZglj6C8tQHaFj&pid=Api&P=0&w=300&h=300',
        name : 'Drunk on Shadows',
        artist : 'HIM',
        music : 'https://audio.jukehost.co.uk/I1wxpgpBMvtNgPlRGJeDbNWaa8oOWLbh'
    },
    {
        img : 'https://tse3.explicit.bing.net/th?id=OIP.-jDfb0xekFXU6dcSX3NWtwHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Ghost',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/WOPfaauUtOUW9lbnVODNVdDG3GhEtVi4'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.aNIDOi2L24l5VanDZ3o-QwHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Guzzle, Guzzle',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/3BwIXlKx1hs7o9z0Iqlvz8cmockxtvhT'
    },
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.AFocFz9Kj8GyATSkHHCAbQAAAA&pid=Api&P=0&w=300&h=300',
        name : 'Ill Keep Your Memory Vague.mp3',
        artist : 'Finger Eleven',
        music : 'https://audio.jukehost.co.uk/1QrT5Ya7H4PAqgU3WhoEmL9wtYEq8XuL'
    },
    {
        img : 'https://tse1.mm.bing.net/th?id=OIP.dL5yElRoP4WsNipapQupOgHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Killing Loneliness',
        artist : 'HIM',
        music : 'https://audio.jukehost.co.uk/S5xkYVuGqd8inrbDupQP9hXLHmQUiGpX'
    },
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.vQHzbmy-vhlXArDz45W7rAHaGh&pid=Api&P=0&w=300&h=300',
        name : 'Leave_Out_All_The_Rest',
        artist : 'Linkin Park',
        music : 'https://audio.jukehost.co.uk/OLodh0DApQGqaIUWK1G4lynLVNYdVJfP'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.bVRoAPSCONTny9oD6vkJhgAAAA&pid=Api&P=0&w=300&h=300',
        name : 'Lips Of An Angel',
        artist : 'Hinder',
        music : 'https://audio.jukehost.co.uk/tNNjPL1DHyEDzzrqulswNt6B5Us3vRep'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.X1FxwOStvCRsREx6aWNILAHaF7&pid=Api&P=0&w=300&h=300',
        name : 'No More Sorrow',
        artist : 'Linkin Park',
        music : 'https://audio.jukehost.co.uk/zCQGHsl4SuTb2z9u5VY7lasGqslgOBkx'
    },
    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.Dbn6YAhlZwubIMo1pORgzgHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Paralyzer',
        artist : 'Finger Eleven',
        music : 'https://audio.jukehost.co.uk/LGzAWjBxOjfBlSEv2DwYMbZyciXMRxQk'
    },
    {
        img : 'https://tse3.explicit.bing.net/th?id=OIP.YGh92do44r6QKnebxSMyPwHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Party By Myself',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/Ln3lbAopVUPpVZMTowwpAwWmAkGOZqZd'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.eZTfmMimKUYqb1PSsDMH3wHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Photograph',
        artist : 'Nickelback',
        music : 'https://audio.jukehost.co.uk/ZtbvOqopXJ9pioHk8SAPJ42mTcCt3DK8'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.5NvQg0nW8CVbmcx_Ga4o8AHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Rip off the Wings of a Butterfly',
        artist : 'HIM',
        music : 'music/butterly.mp3'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.mLUkIT2e7oT20Yy4alc1lAHaEK&pid=Api&P=0&w=300&h=300',
        name : 'S.E.X',
        artist : 'Nickelback',
        music : 'https://audio.jukehost.co.uk/XMa08F5FV40XkePhng1KYVNIcIVuGIYh'
    },
    {
        img : 'https://tse3.mm.bing.net/th?id=OIP.6v0PS7khKJnRhpQR4J4DZgHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Ten Thousand Fists',
        artist : 'Disturbed',
        music : 'https://audio.jukehost.co.uk/qKEVLIULjzNCOY2FI4gnSFLNQw1bJgKr'
    },
    {
        img : 'https://tse2.mm.bing.net/th?id=OIP.-mTFZ96SpL3RMM6Rd53M_QHaEK&pid=Api&P=0&w=300&h=300',
        name : 'The Face of God',
        artist : 'HIM',
        music : 'https://audio.jukehost.co.uk/VUKUam5q9OfXRuSSMt2m5S0yFC2CioVm'
    },

    {
        img : 'https://tse4.mm.bing.net/th?id=OIP.id0dUMBCNxyxdffwldV6jwFNC7&pid=Api&P=0&w=300&h=300',
        name : 'Toxicity',
        artist : 'System of a Down',
        music : 'https://audio.jukehost.co.uk/gvn0jzMExweTdxob7NGVX19vH0B9MuJr'
    },

    {
        img : 'https://tse1.mm.bing.net/th?id=OIP.ywxibVp8bOmnv45kydkTXAHaHa&pid=Api&P=0&w=300&h=300',
        name : 'Undead',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/7wkUeXaDNa35ONEyBtGCIN2NdaK5QBhe'
    },

    {
        img : 'https://tse1.mm.bing.net/th?id=OIP.RP0W_YdO0DMDqqnuIgUZSAHaEK&pid=Api&P=0&w=300&h=300',
        name : 'Usual Suspects',
        artist : 'Hollywood Undead',
        music : 'https://audio.jukehost.co.uk/H8DE5w93bm0El8Jhiea5QLL5uZ3jiaIT'
    }
];

loadTrack(track_index);
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function speakVolumeDown(){
    curr_track.volume = volume_slider.value - 50;
}

function speakVolumeUp(){
    curr_track.volume = volume_slider.value + 50;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}

var startX, startY, moveX, moveY;
//here clientX, and clientY means X and Y coordinates
function touchStart(e){
    startX = e.touches[0].clientX ;
    startY = e.touches[0].clientY ;
}

function touchMove(e){
    moveX = e.touches[0].clientX ;
    moveY = e.touches[0].clientY ;
}
function touchEnd()
{
    if(startX+100 < moveX)
    {
        console.log('right');
        nextTrack();
    }else if(startX-100 > moveX)
    {
        console.log('left');
        prevTrack();
    }
    if(startY+100 < moveY)
    {
        console.log('down');
    }else if(startY-100 > moveY)
    {
        console.log('up');
    }
}