(function($){
	// Settings
	var continous = true,	
	playlistLx = [
		{
			title: ' 我变了 我没变',
			artist: '杨宗纬',
			album: ' 我变了 我没变.mp3',
			cover: 'img/3.jpg',
			mp3: 'mp3/ 我变了 我没变.mp3',
			song:'3'
			},
		
			{
			title: 'Hello',
			artist: 'Adele',
			album: 'Hello.mp3',
			cover: 'img/2.jpg',
			mp3: 'mp3/Hello.mp3',
			song:'2'
			},
			{
			title: 'sugar',
			artist: 'Maroon 5',
			album: 'sugar.mp3',
			cover:'img/1.jpg',
			mp3: 'mp3/Sugar.mp3',
			song:'1'
			},
			{
			title: '越过山丘',
			artist: '杨宗纬',
			album: ' 越过山丘.mp3',
			cover: 'img/4.jpg',
			mp3: 'mp3/ 越过山丘.mp3',
			song:'4'
			},
			{
			title: 'Faded',
			artist: 'Alan Walker',
			album: ' Faded.mp3',
			cover: 'img/5.jpg',
			mp3: 'mp3/Faded.mp3',
			song:'5'
			},
			{
			title: 'We Dont Talk Anymore',
			artist: 'Charlie Puth',
			album: 'We Dont Talk Anymore.mp3',
			cover: 'img/6.jpg',
			mp3: 'mp3/anymore.mp3',
			song:'6'
			},
//			{
//			title: '你快乐所以我快乐',
//			artist: '王菲',
//			album: ' 你快乐（所以我快乐）.mp3',
//			cover: 'img/7.jpg',
//			mp3: 'mp3/你快乐（所以我快乐）.mp3',
//			song:'7'
//			},
//			{
//			title: '致青春',
//			artist: '王菲',
//			album: '致青春.mp3',
//			cover: 'img/8.jpg',
//			mp3: 'mp3/致青春.mp3',
//			song:'8'
//			},
			{
			title: 'Blue',
			artist: 'BIGBANG',
			album: 'Blue.mp3',
			cover: 'img/9.jpg',
			mp3: 'mp3/Blue.mp3',
			song:'9'
			},
			{
			title: 'Spring Day',
			artist: 'BTS',
			album: 'Spring Day.mp3',
			cover: 'img/10.jpg',
			mp3: 'mp3/Spring Day.mp3',
			song:'10'
			}
		];

	// playlistLx 拼接数据
	for (var i=0; i<playlistLx.length; i++){
		var itemLx = playlistLx[i];
		$('#playlist').append('<li>'+itemLx.artist+' - '+itemLx.title+'</li>');
		
	}
    //获取时间
	var time = new Date(),
//		//设置歌曲初始值，第几首
		currentTrack = 0,
		audio, timeout, isPlaying;
    //开始
    
	var play = function(){
	     //MP3开始
		audio.play();
		//开始按钮变成暂停按钮
		$('.playback').addClass('playing');
		//音频进度条变化
		timeout = setInterval(updateProgress, 500);
		isPlaying = true;
		//圆盘图片转动
		$('.cdCover img').addClass("cdStart");
		
	}
	//停止
	var pause = function(){
		//音乐停止
		audio.pause();
		//暂停按钮变开始
		$('.playback').removeClass('playing');
		//清除进度条
		clearInterval(updateProgress);
		isPlaying = false;
		//圆盘停止转动
		$('.cdCover img').removeClass("cdStart");
	}

	
	
	//声音滑动
	var setVolume = function(value){
		//储存当前声音值
		audio.volume = localStorage.volume = value;
		//滑轨上面的距离比例
		$('.volume .pace').css('width', value * 100 + '%');
		//这是滑轨上面的小按钮的位置
		$('.volume .slider a').css('left', value * 100 + '%');
	}

    //储存声音的大小
	var volume = localStorage.volume || 0.5;
	//声音滑动变化  0--1 按0.01往上加， 
	$('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
		//声音滑动时改变的声音值
		setVolume(ui.value);
		//透明度为1
		$(this).addClass('enable');
		//禁止图标
		$('.mute').removeClass('enable');
	}, stop: function(){
		//全透明
		$(this).removeClass('enable');
	}}).children('.pace').css('width', volume * 100 + '%');
    //点击喇叭、有声或者禁止
	$('.mute').click(function(){
		if ($(this).hasClass('enable')){
			//取消禁止，喇叭音量位置为储存的音量位置
			setVolume($(this).data('volume'));
			//移除禁止图标
			$(this).removeClass('enable');
		} else {
			//储存当前音量的位置
			$(this).data('volume', audio.volume).addClass('enable');
			//喇叭禁声时，设置声音为0
			setVolume(0);
		}
	});
	
	// 设置进度
	var setProgress = function(value){
		var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
			ratio = value / audio.duration * 100;
        //音频的时间改变
		$('.timer').html(parseInt(value/60)+':'+currentSec);
		//进度条位置
		$('.progress .pace').css('width', ratio + '%');
		//滑动块的位置
		$('.progress .slider a').css('left', ratio + '%');
	}
	//储存声音的大小
	var progress = localStorage.progress || 0.5;
    //更新进度条状态
	var updateProgress = function(){
		//进度根据歌曲MP3的进度，currentTime的初始值为0
		setProgress(audio.currentTime);
	}
	
	//进度条滑动
//   $('.progress .slider').slider({max: 1, min: 0, step: 0.01,value: progress, slide: function(event, ui){
//		$(this).addClass('enable');
//		setProgress(audio.duration * ui.value / 100);
////		clearInterval(timeout);
//	}, stop: function(event, ui){
//		audio.currentTime = audio.duration * ui.value / 100;
//		$(this).removeClass('enable');
////		timeout = setInterval(updateProgress, 500);
//	}});
	
//	$('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
//		setVolume(ui.value);
//		//透明度为1
//		$(this).addClass('enable');
//		//禁止图标
//		$('.mute').removeClass('enable');
//	}, stop: function(){
//		//全透明
//		$(this).removeClass('enable');
//	}}).children('.pace').css('width', volume * 100 + '%');
	// 切换歌曲
	var switchTrack = function(i){
		//设置的临界点
		if (i < 0){
			//切换歌曲的时候，关联MP3第几首
			track = currentTrack = playlistLx.length - 1;
		} else if (i >= playlistLx.length){			
			track = currentTrack = 0;
		} else {
			//点击的歌曲对应数据里MP3的位置
			track = i;
		}
        //移除上一个歌曲
		$('audio').remove();
		//点击切换列表的时候改变列表
		loadMusic(track);
		//如果歌曲是开启的按钮，就是开启
		if (isPlaying == true) play();
	}

	// 变换位置
//	var shufflePlay = function(){
//		var time = new Date(),
//			lastTrack = currentTrack;
//			//循环列表
//		currentTrack = time.getTime() % playlistLx.length;
//		if (lastTrack == currentTrack) ++currentTrack;
//		switchTrack(currentTrack);
//	}

	// 停止
	var ended = function(){
		pause();
		//音乐MP3设置为初始值
		audio.currentTime = 0;
//		playCounts++;
		//如果继续为真，继续播放
		if (continous == true) isPlaying = true;

	}
  //上一首
	var beforeLoad = function(){
//		if (autoplay == true) play();
		var endVal = 0;
		$('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
	}

	//添加音乐列表 点击变化当前的li前面添加一个小喇叭
	var loadMusic = function(i){
		var item = playlistLx[i],
		    //把MP3插入到页面中
			newaudio = $('<audio>').html('<source src="'+item.mp3+'"><source src="">').appendTo('#player');
		
		$('.cover').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('#backgroundLx').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('.cdCover').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span><span class="album">'+item.album+'</span>');
		$('#playlist li').removeClass('playing').eq(i).addClass('playing');
		//设置音响的初始值为第一个mp3
		audio = newaudio[0];
		//mp3播放或者停止
		audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
		audio.addEventListener('progress', beforeLoad, false);
//		audio.addEventListener('durationchange', beforeLoad, false);
		audio.addEventListener('ended', ended, false);
	}

	loadMusic(currentTrack);
	//音乐开始的点击事件
	$('.playback').on('click', function(){
		//如果变成了终止的按钮图标，那么就是停止
		if ($(this).hasClass('playing')){
			pause();
		} else {
			play();
		}
	});
	//上一首
	$('.rewind').on('click', function(){
			//列表里歌曲位置往上 变量
			switchTrack(--currentTrack);

	});
	//下一首
	$('.fastforward').on('click', function(){
           //列表里歌曲位置往下
			switchTrack(++currentTrack);
	});
	//点击歌曲列表
	$('#playlist li').each(function(i){
		var _i = i;
		//点击调用封装的函数
		$(this).on('click', function(){
			switchTrack(_i);
		});
	});

})(jQuery);