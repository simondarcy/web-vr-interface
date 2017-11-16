/**
 * Created by sidarcy on 20/10/2017.
 */

hasMoved = false;

playBtn = document.getElementById("playBtn");
backBtn = document.getElementById("backBtn");
homeBtn = document.getElementById("homeBtn");
videoSphere = document.getElementById('videosphere');
contentArea = document.getElementById('content');
videoEl = document.querySelector('#video');

AFRAME.registerComponent('selectable', {

    init: function () {

        var el = this.el;
        this.el.addEventListener('mouseenter', function (evt) {
            this.setAttribute('material', 'color', 'blue');
            //this.setAttribute('scale', {x: 1, y: 1, z: 0.95});
        });
        this.el.addEventListener('mouseleave', function (evt) {
            this.setAttribute('material', 'color', '');
            //this.setAttribute('scale', {x: 1, y: 1, z: 1});

        });
        this.el.addEventListener('click', function (evt) {



            if(!hasMoved) hasMoved = true; return;


            this.setAttribute('material', 'color', 'red');

            document.getElementById("content").setAttribute('text', 'value', this.getAttribute("content"));

            console.log(this.getAttribute("content"));


            document.getElementById("content").setAttribute('rotation', 'y', document.querySelector('#camera').getAttribute('rotation').y);
            document.getElementById("content").setAttribute('rotation', 'x', document.querySelector('#camera').getAttribute('rotation').x);


            document.getElementById("content").setAttribute('position', 'x', document.querySelector('#camera').getAttribute('position').x);
            document.getElementById("content").setAttribute('position', 'y', document.querySelector('#camera').getAttribute('position').y);



        });
    }
});




var noOfElements = 25;
var listEl = document.querySelector('#videolist');
var newEl;
var rotationStartX = 145;
var positionStartY = 3;
var padding = 16;
var radius = 7.5;
var theta = 15;
var scale = 0.7;
cols = 8;
rows = 5;

rotationX = rotationStartX;

function draw(articles) {

    for (var i = 1; i <= articles.length; i++) {


        newEl = document.createElement('a-curvedimage');

        newEl.setAttribute('radius', radius);
        newEl.setAttribute('theta-length', theta);
        newEl.setAttribute('position', '0 ' + positionStartY + ' 0');
        newEl.setAttribute('rotation', '0 ' + rotationX + ' 0');
//            newEl.setAttribute('src', '//img.rasset.ie/' + articles[i].thumbnail_refcode + '-302.jpg?cb=123');
        newEl.setAttribute('set-image',"on: click; target: #bgr; src: #fm");
        newEl.setAttribute('src', 'img/bloom.jpg');
        newEl.setAttribute('material', 'opacity: 0');
        newEl.setAttribute('selectable', 'true');
        newEl.setAttribute('content', articles[i].title);
        animEl = document.createElement('a-animation');
        animEl.setAttribute('attribute', 'material.opacity');
        animEl.setAttribute('begin', i + '00');
        animEl.setAttribute('from', '0');
        animEl.setAttribute('to', '1');


        //<a-curvedimage height="2" radius="5.3" theta-length="32" position="0 0 -0.1" rotation="0 0 0" scale="1 1 1"  src="#play"></a-curvedimage>

        newEl.appendChild(animEl);
        listEl.appendChild(newEl);


        if (i % rows == 0) {
            rotationX = rotationStartX;
            positionStartY -= 1.1;
        }
        else {
            rotationX -= padding;
        }

    }
}//end draw



function loadContent() {

    dateurl = '//www.rte.ie/sitesearch/newsnowlive/select/?q=*:*&fq=categories:News&fq=type:article&fq=sub_type:newsdocument&fq=pillar:news&sort=date_modified desc&rows=26&wt=json';
    items = "";
    $.ajax({
        'url': dateurl,
        'success': function(data) {
            articles = data.response.docs;

            draw(articles);

            $.each(articles, function(i, article) {
                console.log(article.title)

            })

        },
        'dataType': 'jsonp',
        'jsonp': 'json.wrf'
    });
}


loadContent();



function playVideo(){
    //hide all elements
    contentArea.setAttribute('visible', 'false');
    document.getElementById('bgr').setAttribute('visible', 'false');
    //show video
    document.querySelector('a-videosphere').setAttribute("visible", true);

    videoEl.setAttribute('src', "video/bloom.mp4");
    videoEl.load();
    videoEl.play();
}


playBtn.addEventListener('click', function () {
    playVideo();
});

playBtn.addEventListener('mouseenter', function (evt) {
    this.setAttribute('material', 'color', 'blue');
});
playBtn.addEventListener('mouseleave', function (evt) {
    this.setAttribute('material', 'color', '');

});



function back(){
    contentArea.setAttribute('visible', 'false');
    videoEl.pause();
    videoSphere.setAttribute('visible', 'false');
    document.getElementById('bgr').setAttribute('material', 'src', '#sky');
    document.getElementById('bgr').setAttribute('visible', 'true');
    //show video
    videolist = document.getElementById('videolist');
    videolist.setAttribute('visible', 'true');
}

backBtn.addEventListener('click', function () {
    back()
});

backBtn.addEventListener('mouseenter', function (evt) {
    this.setAttribute('material', 'color', 'blue');
});
backBtn.addEventListener('mouseleave', function (evt) {
    this.setAttribute('material', 'color', '');
});



homeBtn.addEventListener('click', function () {
    back();
});
homeBtn.addEventListener('mouseenter', function (evt) {
    this.setAttribute('material', 'color', 'blue');
});
homeBtn.addEventListener('mouseleave', function (evt) {
    this.setAttribute('material', 'color', '');
});
