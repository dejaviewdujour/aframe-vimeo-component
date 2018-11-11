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
