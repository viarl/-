(function (window) {
    //����
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var HZRecorder = function (stream, config) {
        config = config || {};
        config.sampleBits = config.sampleBits || 8;      //������λ 8, 16
        config.sampleRate = config.sampleRate || (44100 / 6);   //������(1/6 44100)

        
        //����һ����Ƶ��������
        audioContext = window.AudioContext || window.webkitAudioContext;
        var context = new audioContext();

        //�����������������
        var audioInput = context.createMediaStreamSource(stream);
        
        //���������ڵ�
        var volume = context.createGain();
        audioInput.connect(volume);

        //�������棬������������
        var bufferSize = 4096;

        // ���������Ļ���ڵ㣬createScriptProcessor������
        // �ڶ����͵���������ָ����������������˫������
        var recorder = context.createScriptProcessor(bufferSize, 2, 2);

        var audioData = {
            size: 0          //¼���ļ�����
            , buffer: []     //¼������
            , inputSampleRate: context.sampleRate    //���������
            , inputSampleBits: 16       //���������λ 8, 16
            , outputSampleRate: config.sampleRate    //���������
            , oututSampleBits: config.sampleBits       //���������λ 8, 16
            , input: function (data) {           	
                this.buffer.push(new Float32Array(data));
                this.size += data.length;
            }
            , compress: function () { //�ϲ�ѹ��
                //�ϲ�
                var data = new Float32Array(this.size);
                var offset = 0;
                for (var i = 0; i < this.buffer.length; i++) {
                    data.set(this.buffer[i], offset);
                    offset += this.buffer[i].length;
                }
                this.buffer=[];
                //ѹ��
                var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                var length = data.length / compression;
                var result = new Float32Array(length);
                var index = 0, j = 0;
                while (index < length) {
                    result[index] = data[j];
                    j += compression;
                    index++;
                }
                return result;
            }
            , encodeWAV: function () {
                var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                var bytes = this.compress();
                var dataLength = bytes.length * (sampleBits / 8);
                var buffer = new ArrayBuffer(44 + dataLength);
                
                var data = new DataView(buffer);

                var channelCount = 1;//������
                var offset = 0;

                var writeString = function (str) {
                    for (var i = 0; i < str.length; i++) {
                        data.setUint8(offset + i, str.charCodeAt(i));
                    }
                };
                
                // ��Դ�����ļ���ʶ�� 
                writeString('RIFF'); offset += 4;
                // �¸���ַ��ʼ���ļ�β���ֽ���,���ļ���С-8 
                data.setUint32(offset, 36 + dataLength, true); offset += 4;
                // WAV�ļ���־
                writeString('WAVE'); offset += 4;
                // ���θ�ʽ��־ 
                writeString('fmt '); offset += 4;
                // �����ֽ�,һ��Ϊ 0x10 = 16 
                data.setUint32(offset, 16, true); offset += 4;
                // ��ʽ��� (PCM��ʽ��������) 
                data.setUint16(offset, 1, true); offset += 2;
                // ͨ���� 
                data.setUint16(offset, channelCount, true); offset += 2;
                // ������,ÿ��������,��ʾÿ��ͨ���Ĳ����ٶ� 
                data.setUint32(offset, sampleRate, true); offset += 4;
                // �������ݴ����� (ÿ��ƽ���ֽ���) ��������ÿ������λ����ÿ��������λ/8 
                data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
                // �����ݵ����� ����һ��ռ���ֽ��� ��������ÿ����������λ��/8 
                data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
                // ÿ��������λ�� 
                data.setUint16(offset, sampleBits, true); offset += 2;
                // ���ݱ�ʶ�� 
                writeString('data'); offset += 4;
                // ������������,�������ܴ�С-44 
                data.setUint32(offset, dataLength, true); offset += 4;
                // д��������� 
                if (sampleBits === 8) {
                    for (var i = 0; i < bytes.length; i++, offset++) {
                        var s = Math.max(-1, Math.min(1, bytes[i]));
                        var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                        val = parseInt(255 / (65535 / (val + 32768)));
                        data.setInt8(offset, val, true);
                    }
                } else {
                    for (var i = 0; i < bytes.length; i++, offset += 2) {
                        var s = Math.max(-1, Math.min(1, bytes[i]));
                        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
                }

                return new Blob([data], { type: 'audio/wav' });
            }
        };

        var timer1;
        //��ʼ¼��
        this.start = function () {
            audioInput.connect(recorder);
            recorder.connect(context.destination);
            timer1=window.setInterval(function(){sendMsg(audioData.encodeWAV());},2000);
            startDraw(audio[0]);
        };

        //ֹͣ
        this.stop = function () {
            recorder.disconnect();           
            window.clearInterval(timer1);
        };

        //��ȡ��Ƶ�ļ�
        this.getBlob = function () {
            this.stop();
            return audioData.encodeWAV();
        };

        //�ط�
        this.play = function (audio) {
            //audio.src = window.URL.createObjectURL(this.getBlob());
        };

        //�ϴ�
        /*this.upload = function (url, callback) {
            var fd = new FormData();
            fd.append('audioData', this.getBlob());
            var xhr = new XMLHttpRequest();
            if (callback) {
                xhr.upload.addEventListener('progress', function (e) {
                    callback('uploading', e);
                }, false);
                xhr.addEventListener('load', function (e) {
                    callback('ok', e);
                }, false);
                xhr.addEventListener('error', function (e) {
                    callback('error', e);
                }, false);
                xhr.addEventListener('abort', function (e) {
                    callback('cancel', e);
                }, false);
            }
            xhr.open('POST', url);
            xhr.send(fd);
        };*/

        //��Ƶ�ɼ�
        recorder.onaudioprocess = function (e) {
            audioData.input(e.inputBuffer.getChannelData(0));
            //record(e.inputBuffer.getChannelData(0));
        };

    };
    
    
    //�׳��쳣
    HZRecorder.throwError = function (message) {
        throw new function () { this.toString = function () { return message; };};
    };
    //�Ƿ�֧��¼��
    HZRecorder.canRecording = (navigator.getUserMedia != null);
    //��ȡ¼����
    HZRecorder.get = function (callback, config) {
        if (callback) {
            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { audio: true } //ֻ������Ƶ
                    , function (stream) {
                        var rec = new HZRecorder(stream, config);
                        callback(rec);
                    }
                    , function (error) {
                        switch (error.code || error.name) {
                            case 'PERMISSION_DENIED':
                            case 'PermissionDeniedError':
                                HZRecorder.throwError('�û��ܾ��ṩ��Ϣ��');
                                break;
                            case 'NOT_SUPPORTED_ERROR':
                            case 'NotSupportedError':
                                HZRecorder.throwError('<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">�����</a>��֧��Ӳ���豸��');
                                break;
                            case 'MANDATORY_UNSATISFIED_ERROR':
                            case 'MandatoryUnsatisfiedError':
                                HZRecorder.throwError('�޷�����ָ����Ӳ���豸��');
                                break;
                            default:
                                HZRecorder.throwError('�޷�����˷硣�쳣��Ϣ:' + (error.code || error.name));
                                break;
                        }
                    });
            } else {
                HZRecorder.throwErr('��ǰ<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">�����</a>��֧��¼�����ܡ�'); return;
            }
        }
    };
    window.HZRecorder = HZRecorder;

})(window);