import './index.styl'
import clickAudio from "@/assets/audio/click.mp3";

export default {
  bind(el, binding) {
    el.addEventListener('touchstart', e => {
      if (!el.classList.contains('click-zoom')) {
        el.classList.add("click-zoom")
        let audioDom = document.getElementById('commonAudio');
        audioDom.src = clickAudio;
        audioDom.play();
        setTimeout(() => {
          el.classList.remove("click-zoom")
        }, 600);
      }
    }, false)
  }
}