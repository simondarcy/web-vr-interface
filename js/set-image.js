AFRAME.registerComponent('set-image', {
        schema: {
            on: {
                type: 'string'
            }
            , target: {
                type: 'selector'
            }
            , src: {
                type: 'string'
            }
            , dur: {
                type: 'number', default: 300
            }
        }
        , init:function() {

            var data=this.data;
            var el=this.el;
            this.setupFadeAnimation();
            el.addEventListener(data.on, function() {

                if(!hasMoved) return;
                console.log("hit");

                videolist = document.getElementById('videolist');
                videolist.setAttribute('visible', 'false');


                    data.target.emit('set-image-fade');
                    setTimeout(function() {
                            data.target.setAttribute('material', 'src', '#black');
                            data.target.setAttribute('color', 'black');
                            document.getElementById("content").setAttribute('visible', 'true')
                        }
                        , data.dur);
                }
            );



        }
        , setupFadeAnimation:function() {
            var data=this.data;
            var targetEl=this.data.target;
            if(targetEl.dataset.setImageFadeSetup) {
                return;
            }
            targetEl.dataset.setImageFadeSetup=true;
            targetEl.setAttribute('animation__fade', {
                    property: 'material.color', startEvents: 'set-image-fade', dir: 'alternate', dur: data.dur, from: '#FFF', to: '#000'
                }
            );
        }
    }

);