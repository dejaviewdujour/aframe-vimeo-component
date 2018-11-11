(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
if (window.AFRAME && window.Vimeo) {
  AFRAME.registerComponent('vimeo', {
    schema: {
      id: { type: 'number' },
      muted: { type: 'boolean', default: false },
      autoplay: { type: 'boolean', default: true },
      quality: { type: 'string', default: Vimeo.VideoQuality.auto }
    },

    init: function() {
      this.vimeoPlayer = new Vimeo.Player(this.data.id, this.data);
      this.vimeoPlayer.on('videoLoad', this.onVideoLoad.bind(this));
      this.vimeoPlayer.load();
    },

    onVideoLoad: function() {
      this.setMaterial(this.vimeoPlayer.texture);
    }, 

    setMaterial: function(texture) {
      this.el.object3D.children[0].material = new THREE.MeshBasicMaterial({ 
        map: this.vimeoPlayer.texture, 
        side: THREE.DoubleSide
      });
    }
  
  });
}
else {
  console.warn('[Vimeo] three.js was not found.')
}

},{}]},{},[1]);
