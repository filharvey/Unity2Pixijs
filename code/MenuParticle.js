class MenuParticle extends MenuObject
{
    constructor (data)
    {
        super (data);
        //console.log("      ->MenuParticle",this.data.name,this.data.particleTag);
        this.filename = null;
        this.aImages  = [];
        this.emitter  = null;

        this.worldSpacePosition = null;
    }

    init ()
    {
        super.init ();
    }

    destroy ()
    {
        super.destroy ();
    }

    reset ()
    {
        super.reset ();

        if (this.filename == null && this.data.particle.filename != null && this.data.particle.filename != "") {
            this.filename = 'assets/particles/menus/' + this.data.particle.filename + '.json';
        }

        if (this.data.particle.images != null && this.aImages.length <= 0)
        {
            for (var i = 0; i < this.data.particle.images.length; ++i) {
                this.aImages.push(this.data.particle.images[i] + '.png');
            }
        }

        if (this.emitter == null) {
            this.createParticleEffect();
        }
    }

    enable(state)
    {
        if (state) {
            ParticleEffectManager.instance.playEffect(this.data.particleTag, this.data.particleKey);

            if (this.data.particle.useWorldSpace)
            {
                this.worldSpacePosition = MainGame.instance.toGlobal (this.container.position);
            }
        } else {
            ParticleEffectManager.instance.stopEmission(this.data.particleTag, this.data.particleKey);
        }
    }

    createParticleEffect()
    {
        if (this.filename == null || this.aImages.length <= 0) {
            return;
        }
        else if (PIXI.loaders.shared.resources[this.filename] == null) {
            return;
        }

        var obj = {};
        obj.data = PIXI.loaders.shared.resources[this.filename].data;
        
        var aTextures = [];
        for (var i = 0; i < this.aImages.length; ++i) {
            var texture = PIXI.Texture.fromImage(this.aImages[i]);
            if (texture != null) {
                aTextures.push(texture);
            }
        }
        if (aTextures.length > 0) {
            this.container = new PIXI.Container ();
            this.container.interactiveChildren = false;
            this.addChild (this.container);
            this.emitter = new PIXI.particles.Emitter(this.container, aTextures, obj.data);
            ParticleEffectManager.instance.addEmitter(this.data.particleTag, this.data.particleKey, this.emitter);
        }
    }

    updatePosition ()
    {
        super.updatePosition ();

        if (this.data.particle.useWorldSpace)
        {
//            this.container.position = this.toLocal (this.worldSpacePosition);
        }
    }    
}


/*


MenuParticle.particleEffects = {};


MenuParticle.prototype.enable = function(state) {

    if (state) {

        MenuParticle.particleEffects[this.data.particleTag][this.data.particleKey].autoUpdate = true;

        MenuParticle.particleEffects[this.data.particleTag][this.data.particleKey].emit = true;

        MenuParticle.particleEffects[this.data.particleTag][this.data.particleKey].parent.visible = true;

    } else {

        MenuParticle.particleEffects[this.data.particleTag][this.data.particleKey].emit = false;

    }

};



MenuParticle.prototype.createParticleEffect = function() {

    if (this.filename == null || this.aImages.length <= 0) {

        return;

    } else if (PIXI.loaders.shared.resources[this.filename] == null) {

        return;

    }

    var obj = {};

    obj.data = PIXI.loaders.shared.resources[this.filename].data;

    var aTextures = [];

    for (var i = 0; i < this.aImages.length; ++i) {

        var texture = PIXI.Texture.from(this.aImages[i]);

        if (texture != null) {

            aTextures.push(texture);

        }

    }

    if (aTextures.length > 0) {

        this.container = new PIXI.Container();

        this.container.interactiveChildren = false;

        this.addChild(this.container);

        this.emitter = new PIXI.particles.Emitter(this.container, aTextures, obj.data);

        if (MenuParticle.particleEffects[this.data.particleTag] == null) {

            MenuParticle.particleEffects[this.data.particleTag] = {};

        }

        MenuParticle.particleEffects[this.data.particleTag][this.data.particleKey] = this.emitter;

    }

};



MenuParticle.stopAllEffects = function(tag) {

    if (MenuParticle.particleEffects[tag] != null) {

        var key;

        for (key in MenuParticle.particleEffects[tag]) {

            MenuParticle.particleEffects[tag][key].autoUpdate = false;

            MenuParticle.particleEffects[tag][key].emit = false;

            MenuParticle.particleEffects[tag][key].parent.visible = false;

        }

    }

};

*/