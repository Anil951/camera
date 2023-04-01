window.onload = function () {

    var btn = document.getElementById('downloadbtn'),
      canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d');

    btn.onclick = function () {
      btn.style.backgroundColor = "lightgreen";
      download(canvas, 'sample.png')
    }
  }
  function download(q, filename) {
    // console.log(canvas.toDataURL());
    const link = document.createElement('a');
    link.download = filename;
    link.href = q.toDataURL();
    link.click();
    link.delete;
  }

  let camera_button_photo = document.querySelector("#start-camera-photo");
  let camera_button_video = document.querySelector("#start-camera-video");
  let video = document.querySelector("#video");
  let click_button = document.querySelector("#click-photo");
  let canvas = document.querySelector("#canvas");
  let downloadbtn = document.querySelector("#downloadbtn");
  let start_button = document.querySelector("#start-record");
  let stop_button = document.querySelector("#stop-record");
  let download_link = document.querySelector("#download-video");
  var stopcam = document.getElementById("stop-camera");
  let back = document.querySelector("#back");
  let gallerybtn = document.getElementById("gallerybtn");
  let gallerycontent = document.getElementById("m");
  let preview = document.getElementById("preview");
  let camswitch = document.getElementsByClassName('switchcam')

  let stream = null;
  let media_recorder = null;
  let blobs_recorded = [];



  stopcamera = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  }

  function goback() {
    if (stream == null) {
      //pass
    }
    else {
      stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live') {
          track.stop();
        }
        else {
          //pass
        }
      });
    }

    camera_button_photo.style.display = 'block';
    camera_button_photo.style.marginTop = "180px";
    camera_button_video.style.display = 'block';
    camera_button_video.style.marginTop = "0px";
    gallerybtn.style.display = 'block';
    click_button.style.display = 'none';
    video.style.display = 'none';
    canvas.style.display = 'none';
    downloadbtn.style.display = 'none';
    start_button.style.display = 'none';
    stop_button.style.display = 'none';
    download_link.style.display = 'none';
    stopcam.style.display = 'none';
    back.style.display = 'none';
    gallerycontent.style.display = 'none';
    preview.style.display = "none";
    camswitch[0].style.display = 'none';
    camswitch[1].style.display = 'none';
  }

  camswitch[0].addEventListener('click', async function () {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    }
    catch (error) {
      alert(error.message);
      return;
    }
    video.srcObject = stream;


  });

  camswitch[1].addEventListener('click', async function () {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    }
    catch (error) {
      alert(error.message);
      return;
    }
    video.srcObject = stream;

  });



  camera_button_photo.addEventListener('click', async function () {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    catch (error) {
      alert(error.message);
      return;
    }

    video.srcObject = stream;

    video.style.display = 'block';
    camera_button_photo.style.display = 'block';
    camera_button_photo.style.marginTop = "80px";
    
    click_button.style.display = 'block';
    camera_button_video.style.display = 'none';
    start_button.style.display = 'none';
    stop_button.style.display = 'none';
    back.style.display = 'block';
    stopcam.style.display = 'block';
    gallerybtn.style.display = 'none';
    camswitch[0].style.display = 'block';
    camswitch[1].style.display = 'block';
  });
  click_button.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block';
    downloadbtn.style.display = 'block';
    downloadbtn.style.backgroundColor = "white";

    let a = document.createElement("img");
    let a1 = document.getElementById("canvas");
    a.src = a1.toDataURL()
    a.style.width = "320px";
    a.style.height = "240px";
    y = document.getElementById("canvas").value;
    a.className = "gallery";
    a.value = y;
    document.getElementById("m").appendChild(a);

    let b = document.createElement("img");
    b.src = "delete.png";
    b.style.height = "20px";
    b.style.width = "20px";
    b.setAttribute('title', 'delete');
    b.style.position = "relative";
    b.style.top = "-25px";
    y = document.getElementById("remove").value;
    b.className = "remove";
    b.value = y;
    document.getElementById("m").appendChild(b);

    let c = document.createElement("img");
    c.src = "download.png";
    c.style.height = "20px";
    c.style.width = "20px";
    c.style.position = "relative";
    c.setAttribute('title', 'download');
    c.style.top = "-25px";
    z = document.getElementById("download").value;
    c.className = "download";
    c.value = z;
    document.getElementById("m").appendChild(c);

    c.onclick = function () {
      let impath = a.getAttribute('src')
      const link = document.createElement('a');
      link.download = "gallery.png";
      link.href = impath;
      link.click();
      link.delete;
    }


    b.addEventListener(
      "click", function () {
        a.remove();
        b.remove();
        c.remove();
      }
    );
  });

  gallerybtn.onclick = function () {

    gallerycontent.style.display = 'block';
    camera_button_photo.style.display = 'none';
    camera_button_video.style.display = 'none';
    click_button.style.display = 'none';
    start_button.style.display = 'none';
    download_link.style.display = 'none';
    stopcam.style.display = 'none';
    back.style.display = 'block';


  }




  camera_button_video.addEventListener('click', async function () {

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }
    catch (error) {
      alert(error.message);
      return;
    }

    video.srcObject = stream;
    video.style.display = 'block';
    start_button.style.display = 'block';
    camera_button_photo.style.display = 'none';
    camera_button_video.style.marginTop = "80px";
    canvas.style.display = 'none';
    stopcam.style.display = 'block';
    back.style.display = 'block';
    gallerybtn.style.display = 'none';
    camswitch[0].style.display = 'block';
    camswitch[1].style.display = 'block';


  });
  start_button.addEventListener('click', function () {

    blobs_recorded = [];
    media_recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    media_recorder.addEventListener('dataavailable', function (e) {
      blobs_recorded.push(e.data);
    });

    media_recorder.addEventListener('stop', function () {
      let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/mp4' }));

      let preview = document.getElementById("preview");
      preview.src = video_local;


      let d = document.createElement("video");
      d.controls = "controls";
      d.style.height = "240px";
      d.style.width = "320px";
      y = document.getElementById("m");
      d.src = video_local;
      d.className = "gallery";
      d.value = y;
      document.getElementById("m").appendChild(d);

      let e = document.createElement("img");
      e.src = "delete.png";
      e.style.height = "20px";
      e.style.width = "20px";
      e.setAttribute('title', 'delete');
      e.style.position = "relative";
      e.style.top = "-25px";
      y = document.getElementById("remove").value;
      e.className = "remove";
      e.value = y;
      document.getElementById("m").appendChild(e);

      let f = document.createElement("img");
      f.src = "download.png";
      f.style.height = "20px";
      f.style.width = "20px";
      f.style.position = "relative";
      f.style.top = "-25px";
      f.setAttribute('title', 'download');
      z = document.getElementById("download").value;
      f.className = "download";
      f.value = z;
      document.getElementById("m").appendChild(f);

      e.addEventListener(
        "click", function () {
          d.remove();
          e.remove();
          f.remove();
        }
      );

      f.addEventListener("click", function () {
        const link = document.createElement('a');
        link.download = "gallery.mp4";
        link.href = video_local;
        link.click();
        link.delete;
      });

      download_link.href = video_local;

      start_button.style.display = 'block';
      stop_button.style.display = 'none';
      download_link.style.display = 'block';
    });

    media_recorder.start(1000);

    start_button.style.display = 'none';
    stop_button.style.display = 'block';
  });

  stop_button.addEventListener('click', function () {
    preview.style.display = "block";
    start_button.style.display = 'block';
    stop_button.style.display = 'none';
    download_link.style.display = 'block';

    media_recorder.stop();
  });


