var audioContextV;
window.onload=function(){
	 window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
     window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
     window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
     try {
    	 audioContextV = new AudioContext();   	 
     } catch (e) {        
         console.log(e);
     }
}
var sourceD;
function startDraw(audio){
	if(sourceD==null)
	 sourceD= audioContextV.createMediaElementSource(audio);
	else
		sourceD.mediaElement.src=audio.src;
	 var analyser = audioContextV.createAnalyser();
	 //连接：source → analyser → destination
	 sourceD.connect(analyser);
	 analyser.connect(audioContextV.destination);
	 audio.play();   
	 draw(analyser);  
}
function draw(analyser) {
        canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,      
        ctx = canvas.getContext('2d');
        ctx.lineWidth=3.5;
        var circle={
        		x:300,
        		y:300,
        		r:250
        };
        gradient = ctx.createRadialGradient(circle.x,circle.y,circle.r-80,circle.x,circle.y,circle.r+25);
        gradient.addColorStop(0,'#4169E1');
        gradient.addColorStop(0.5,'#B2DFEE'); 
        gradient.addColorStop(1,'#4169E1');        
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);              
            var step = Math.round(array.length / 12); //sample limited data from the total array
            ctx.clearRect(0, 0, cwidth, cheight);           
            for (var i = 0; i < 12; i++) {
                var value = array[(11-i) * step]/300;
                ctx.beginPath(); 
                var j;
                if(i<2)
                	j=0.1;
                if(i>=2&&i<4)
                	j=0.3;
                if(i>=4&&i<8)
                	j=0.2;
                if(i>=8&&i<10)
                	j=0.5;
                if(i>=10&&i<12)
                	j=0.1;
                my_gradient=ctx.arc(circle.x,circle.y,circle.r-25-(12-i)*5,(1.5-j*value)*Math.PI,(1.5+j*value)*Math.PI,false); 
                ctx.strokeStyle=gradient; 
                ctx.stroke();                	                                                    
            }
            
            var r=circle.r;
            var j=array[Math.round(array.length /2)]/300*90;
            if(j!=0){
            	 if(Math.round(j)>=45){
                	 var jt=90/Math.round(j);                       
                     for(var i=0;i<=j;i+=jt){
                     	ctx.moveTo(circle.x-r*Math.cos(2*Math.PI/360*i), circle.y+r*Math.sin(2*Math.PI/360*i));
                     	ctx.lineTo(circle.x-(r-20)*Math.cos(2*Math.PI/360*i), circle.y+(r-20)*Math.sin(2*Math.PI/360*i));
                     	ctx.stroke();

                     	ctx.moveTo(circle.x+r*Math.cos(2*Math.PI/360*i), circle.y-r*Math.sin(2*Math.PI/360*i));
                     	ctx.lineTo(circle.x+(r-20)*Math.cos(2*Math.PI/360*i), circle.y-(r-20)*Math.sin(2*Math.PI/360*i));
                     	ctx.stroke();

                     	ctx.moveTo(circle.x+r*Math.cos(2*Math.PI/360*i), circle.y+r*Math.sin(2*Math.PI/360*i));
                     	ctx.lineTo(circle.x+(r-20)*Math.cos(2*Math.PI/360*i), circle.y+(r-20)*Math.sin(2*Math.PI/360*i));
                     	ctx.stroke();

                     	ctx.moveTo(circle.x-r*Math.cos(2*Math.PI/360*i), circle.y-r*Math.sin(2*Math.PI/360*i));
                     	ctx.lineTo(circle.x-(r-20)*Math.cos(2*Math.PI/360*i), circle.y-(r-20)*Math.sin(2*Math.PI/360*i));
                     	ctx.stroke();
                     }
                }else{
                	for(var i=0;i<=j;i+=2){
                    	ctx.moveTo(circle.x-r*Math.cos(2*Math.PI/360*i), circle.y+r*Math.sin(2*Math.PI/360*i));
                    	ctx.lineTo(circle.x-(r-20)*Math.cos(2*Math.PI/360*i), circle.y+(r-20)*Math.sin(2*Math.PI/360*i));
                    	ctx.stroke();

                    	ctx.moveTo(circle.x+r*Math.cos(2*Math.PI/360*i), circle.y-r*Math.sin(2*Math.PI/360*i));
                    	ctx.lineTo(circle.x+(r-20)*Math.cos(2*Math.PI/360*i), circle.y-(r-20)*Math.sin(2*Math.PI/360*i));
                    	ctx.stroke();

                    	ctx.moveTo(circle.x+r*Math.cos(2*Math.PI/360*i), circle.y+r*Math.sin(2*Math.PI/360*i));
                    	ctx.lineTo(circle.x+(r-20)*Math.cos(2*Math.PI/360*i), circle.y+(r-20)*Math.sin(2*Math.PI/360*i));
                    	ctx.stroke();

                    	ctx.moveTo(circle.x-r*Math.cos(2*Math.PI/360*i), circle.y-r*Math.sin(2*Math.PI/360*i));
                    	ctx.lineTo(circle.x-(r-20)*Math.cos(2*Math.PI/360*i), circle.y-(r-20)*Math.sin(2*Math.PI/360*i));
                    	ctx.stroke();
                    }
                }
                var j=array[Math.round(array.length /2)]/300*30;            
            	for(var i=0;i<=j;i+=1.5){
                	ctx.moveTo(circle.x-(r+25)*Math.cos(2*Math.PI/360*i), circle.y+(r+25)*Math.sin(2*Math.PI/360*i));
                	ctx.lineTo(circle.x-(r+5)*Math.cos(2*Math.PI/360*i), circle.y+(r+5)*Math.sin(2*Math.PI/360*i));
                	ctx.stroke();

                	ctx.moveTo(circle.x+(r+25)*Math.cos(2*Math.PI/360*i), circle.y-(r+25)*Math.sin(2*Math.PI/360*i));
                	ctx.lineTo(circle.x+(r+5)*Math.cos(2*Math.PI/360*i), circle.y-(r+5)*Math.sin(2*Math.PI/360*i));
                	ctx.stroke();

                	ctx.moveTo(circle.x+(r+25)*Math.cos(2*Math.PI/360*i), circle.y+(r+25)*Math.sin(2*Math.PI/360*i));
                	ctx.lineTo(circle.x+(r+5)*Math.cos(2*Math.PI/360*i), circle.y+(r+5)*Math.sin(2*Math.PI/360*i));
                	ctx.stroke();

                	ctx.moveTo(circle.x-(r+25)*Math.cos(2*Math.PI/360*i), circle.y-(r+25)*Math.sin(2*Math.PI/360*i));
                	ctx.lineTo(circle.x-(r+5)*Math.cos(2*Math.PI/360*i), circle.y-(r+5)*Math.sin(2*Math.PI/360*i));
                	ctx.stroke();
            }                
            }           	                      	                              
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    }