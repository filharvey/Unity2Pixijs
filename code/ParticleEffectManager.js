class ParticleEffectManager {

    constructor() {

        ParticleEffectManager.instance = this;

        this.EFFECTS = {
            LOBBY_DUST:             {id:  1, json: "lobby/lobby_dust.json",                    imgs: ["particle.png"]},
            LOBBY_LEADERBOARD_1:    {id:  2, json: "lobby/lobby_leaderboard_1.json",           imgs: ["particle.png"]},
            LOBBY_LEADERBOARD_2_3:  {id:  3, json: "lobby/lobby_leaderboard_2_3.json",         imgs: ["sparkle.png"]},
            HUD_SPARKLE_RED:        {id:  4, json: "shared/sparkle_red.json",                  imgs: ["sparkle.png"]},
            HUD_SPARKLE_WHITE:      {id:  5, json: "shared/sparkle_white.json",                imgs: ["sparkle.png"]},
            HUD_SPARKLE_BLUE:       {id:  6, json: "shared/sparkle_blue.json",                 imgs: ["sparkle.png"]},
            HUD_SPARKLE_YELLOW:     {id:  7, json: "shared/sparkle_yellow.json",               imgs: ["sparkle.png"]},
            SUPER_SPARKLE_WHITE:    {id:  8, json: "gameplay/super_sparkle.json",              imgs: ["sparkle.png"]},
            SUPER_SPARKLE_BLUE:     {id:  9, json: "gameplay/super_sparkle_blue.json",         imgs: ["sparkle.png"]},
            SUPER_FIREWALL1_ORANGE: {id: 10, json: "gameplay/super_firewall1_orange.json",     imgs: ["flame_particle.png"]},
            SUPER_FIREWALL1_YELLOW: {id: 11, json: "gameplay/super_firewall1_yellow.json",     imgs: ["particle.png"]},
            SUPER_FIREWALL1_DUST:   {id: 12, json: "gameplay/super_firewall1_dust.json",       imgs: ["particle.png"]},
            SUPER_FIREWALL2_ORANGE: {id: 13, json: "gameplay/super_firewall2_orange.json",     imgs: ["flame_particle.png"]},
            SUPER_FIREWALL2_YELLOW: {id: 14, json: "gameplay/super_firewall2_yellow.json",     imgs: ["particle.png"]},
            SUPER_FIREWALL2_DUST:   {id: 15, json: "gameplay/super_firewall2_dust.json",       imgs: ["particle.png"]},
            SUPER_FIREWALL3_ORANGE: {id: 16, json: "gameplay/super_firewall3_orange.json",     imgs: ["flame_particle.png"]},
            SUPER_FIREWALL3_YELLOW: {id: 17, json: "gameplay/super_firewall3_yellow.json",     imgs: ["particle.png"]},
            SUPER_FIREWALL3_DUST:   {id: 18, json: "gameplay/super_firewall3_dust.json",       imgs: ["particle.png"]},

            ENEMY_SMOKE:            {id: 19, json: "gameplay/enemy_smoke.json",                imgs: ["cloud.png"]},
            BOSS_SMOKE:             {id: 20, json: "gameplay/boss_smoke.json",                 imgs: ["cloud.png"]},
//            SUPER_BITE:             {id: 21, json: "gameplay/super_bite_spark.json",           imgs: ["particle.png"]},
            SUPER_DRILL_BEAK:       {id: 22, json: "gameplay/super_drillbeak_particle.json",   imgs: ["particle.png"]},

            SKILL_SHATTER_ICEBREAK: {id: 23, json: "gameplay/super_shatter_icebreak.json",       imgs: ["glass.png"]},
            SKILL_SHATTER_ICESMOKE: {id: 24, json: "gameplay/super_shatter_icesmoke.json",       imgs: ["smoke.png"]},
            SKILL_SHATTER_ICESPARKLE: {id: 25, json: "gameplay/super_shatter_icesparkle.json",       imgs: ["sparkle.png"]},

            SUPER_WISH_SPARKLE:       {id: 26, json: "gameplay/super_wish_sparkle_burst.json",       imgs: ["sparkle.png"]},
            SUPER_WISH_STAR:     {id: 27, json: "gameplay/super_wish_star_burst.json",       imgs: ["star.png"]}
        }

        this.particleEffectData = {};
        this.particleEffects    = {};

        for (var key in this.EFFECTS) {
            this.loadEffectData(this.EFFECTS[key].id, this.EFFECTS[key].json, this.EFFECTS[key].imgs);
        }
    }

    loadEffectData(dataId, json, aTextures) {
        if (PIXI.loaders.shared.resources["assets/particles/"+json] == null) {
            if (Config.instance.DEBUG) {
                console.log("WARNING! -> loadEffectData -> missing json data:",json);
            }
        }
        else {
            var paSetup = {};
            paSetup.data = PIXI.loaders.shared.resources["assets/particles/"+json].data;
            paSetup.textures = aTextures;
            this.particleEffectData[dataId] = paSetup;
            /*if (Config.instance.DEBUG) {
                console.log("loadEffectData:",dataId,paSetup);
            }*/
        }
    }

    addEmitter(tag, key, emitter)
    {
        //console.log("addEmitter->particle effect",tag,key);

        if (this.particleEffects[tag] == null) {
            this.particleEffects[tag] = {};
        }

        if (this.particleEffects[tag][key] != null) {
            if (Config.instance.DEBUG) {
                console.log("addEmitter->particle effect",tag,key,"already exists!");
            }
        }

        this.particleEffects[tag][key] = emitter;
        this.activate(tag, key, false);
    }

    createAt(x, y, tag, key, effect, parent)
    {
        var dataId = effect.id;

        if (this.particleEffectData[dataId] == null) {
            if (Config.instance.DEBUG) {
                console.log("create->particle effect data",dataId,"does not exist!");
            }
            return;
        }

        if (this.particleEffects[tag] == null) {
            this.particleEffects[tag] = {};
        }

        if (this.particleEffects[tag][key] != null) {
            if (Config.instance.DEBUG) {
                console.log("create->particle effect",tag,key,"already exists!");
            }
        }

        var obj = this.particleEffectData[dataId];
        var aTextures = [];
        for (var i = 0; i < obj.textures.length; ++i) {
            var texture = PIXI.Texture.fromImage(obj.textures[i]);
            if (texture != null) {
                aTextures.push(texture);
            }
        }
        if (aTextures.length > 0) {
            var objEmitter = obj.data;
            var emitterContainer = new PIXI.Container();
            emitterContainer.name = key;
            parent.addChild(emitterContainer);
            var emitter = new PIXI.particles.Emitter(emitterContainer, aTextures, objEmitter);
            emitter.updateOwnerPos(x, y);
            this.particleEffects[tag][key] = emitter;
            this.activate(tag, key, false);
        }
    }

    setLifetime(tag, key, time) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.particleEffects[tag][key].emitterLifetime = time;
            }
        }
    }

    playEffect(tag, key) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.activate(tag, key, true);
            } else {
                if (Config.instance.DEBUG) {
                    console.log("playEffect->particle effect",tag,key,"does not exist!");
                }
            }
        }
    }

    playEffectAt(tag, key, x, y) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.particleEffects[tag][key].updateOwnerPos(x, y);
                this.activate(tag, key, true);
            } else {
                if (Config.instance.DEBUG) {
                    console.log("playEffectAt->particle effect",tag,key,"does not exist!");
                }
            }
        }
    }

    updateEffectAt(tag, key, x, y) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.particleEffects[tag][key].updateOwnerPos(x, y);
            } else {
                if (Config.instance.DEBUG) {
                    console.log("playEffectAt->particle effect",tag,key,"does not exist!");
                }
            }
        }
    }

    playAllEffects(tag) {
        if (this.particleEffects[tag] != null) {
            var key;
            for (key in this.particleEffects[tag]) {
                this.activate(tag, key, true);
            }
        }
    }

    stopEmission(tag, key) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.particleEffects[tag][key].emit = false;
            }
        }
    }

    stopAllEmissions(tag) {
        if (this.particleEffects[tag] != null) {
            var key;
            for (key in this.particleEffects[tag]) {
                this.particleEffects[tag][key].emit = false;
            }
        }
    }

    stopEffect(tag, key) {
        this.activate(tag, key, false);
    }

    stopAllEffects(tag) {
        if (this.particleEffects[tag] != null) {
            var key;
            for (key in this.particleEffects[tag]) {
                this.activate(tag, key, false);
            }
        }
    }

    activate(tag, key, state) {
        if (this.particleEffects[tag] != null) {
            if (this.particleEffects[tag][key] != null) {
                this.particleEffects[tag][key].autoUpdate = state;
                this.particleEffects[tag][key].emit = state;
                this.particleEffects[tag][key].parent.visible = state;
            }
        }
    }

    destroy() {
        var tag, key;
        for (tag in this.particleEffects) {
            for (key in this.particleEffects[tag]) {
                if (this.particleEffects[tag][key] != null) {
                    this.particleEffects[tag][key].autoUpdate = false;
                    this.particleEffects[tag][key].emit = false;
                    this.particleEffects[tag][key].cleanup();
                    this.particleEffects[tag][key].destroy();
                    this.particleEffects[tag][key] = null;
                }
            }
        }
        this.particleEffects = {};
     }
}

ParticleEffectManager.instance = null;
