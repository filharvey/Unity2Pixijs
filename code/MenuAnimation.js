class MenuAnimation
{
    constructor (data, parent)
    {
        this.data = data;
        
        this.parent = parent;        
        this.isPlaying = false;
        this.isPaused = false;
        this.isLooping = true;
        this.curTime = 0;

        this.onComplete = null;

        this.curAnimation = "";

        this.onScriptEventHandler = null;

        this.ignoreObjects = [];
    }

    destroy ()
    {
        this.stop ();
    }

    reset ()
    {
        ParticleEffectManager.instance.stopAllEffects(this.data.particleTag);
        
        var clip = this.clip;

        if (!clip)
            return;

        this.curTime = 0;
        clip.menuObjects = [];
        this.parent.reset ();

        for (var a = 0; a < clip.nodes.length; a++)
        {
            var node = clip.nodes[a];
            var menuObj;
            
            node.lastTime = 0;
            node.lastFrame = 0;

            if (this.ignoreObjects.indexOf (node) != -1)
                continue;

            if (node.name == "")
            {
                menuObj = this.parent;
            }
            else if (!clip.menuObjects[node.name])
            {
// find child                    
                menuObj = clip.menuObjects[node.name] = this.parent.getChild (node.name);

                if (menuObj)
                    menuObj.reset ();
            }
            else
            {
                menuObj = clip.menuObjects[node.name];
            }
            
            if (menuObj && menuObj[node.key] == undefined)
            {
                console.log ("Missing Key: " + node.name + ":" + node.key);
            }

            if (menuObj)
            {                
                if (node.property)
                {
                    menuObj[node.key][node.property] = node.keyframes[0].value;
                    menuObj[node.key].touched = true;
                }
                else
                {
                    if (node.key == "m_LocalRotation")
                    {
                        menuObj[node.key] = node.keyframes[0].value;
                        menuObj.m_LocalRotationTouched = true;
                    }
                    else if (node.key == "m_Sprite")
                    {
                        menuObj[node.key] = node.keyframes[0].name;
                        menuObj.m_SpriteTouched = true;
                    }
                    else if (node.key == "m_IsActive")
                    {
                        if (node.keyframes[0].value == 0)
                            menuObj[node.key] = false;
                        else
                            menuObj[node.key] = true;

                    }
                }

                menuObj.m_IsActiveTouched = true;
            }
        }

        this.parent.updatePosition ();
        this.updateObject (this.parent);

        for (var obj in clip.menuObjects)
        {
            var menuObject = clip.menuObjects[obj];
            menuObject.renderable = true;
            menuObject.updatePosition ();
            this.updateObject (menuObject);
        }    
    }

    clearIgnoreObjects ()
    {
        this.ignoreObjects = [];
    }

    setIgnoreObject (objectName)
    {
        var menuObject = this.parent.getChild (objectName);
        this.ignoreObjects.push (menuObject);
    }

    play (name, looping, onComplete, loopStart, loopEnd)
    {
        if (this.data.animation && this.data.animation.clips[name] &&
            !(this.isPlaying && this.curAnimation == name))
        {
            this.onComplete = onComplete;

            this.curTime = 0;
            this.isPlaying = true;
            this.isPaused = false;

            this.loopStart = loopStart;
            this.loopEnd = loopEnd;
            
            if (looping != null)
                this.isLooping = looping;
            else
                this.isLooping = true;

            this.curAnimation = name;
            this.clip = this.data.animation.clips[name];

            this.reset ();

            this.parent.renderable = true;

            return true;
        }

        return false;
    }

    stop ()
    {   
        if (this.isPlaying)
        {
            ParticleEffectManager.instance.stopAllEffects(this.data.particleTag);
            
            if (this.clip)
            {
                this.clip.menuObjects = [];
                this.clip = null;
            }
    
            this.isPlaying = false;
            this.curAnimation = "";
        }
    }

    gotoAndPlay (name, time, looping, onComplete)
    {
        if (this.play (name, looping, onComplete))
        {
            this.update (time);
            return true;
        }

        return false;
    }

    gotoAndStop (time)
    {
        if (this.isPlaying)
        {
            this.curTime = time;

            // reset the last nodes to 0, so that correct keyFrame Can be calculated
            for (var a = 0; a < this.clip.nodes.length; a++)
            {
                var node = this.clip.nodes[a];
                node.lastTime = 0;
                node.lastFrame = 0;
            }

            this.update (0);
            this.stop ();
        }
    }

    get paused ()
    {
        return this.isPaused;
    }

    set paused (v)
    {
        this.isPaused = v;
    }

    update (dt)
    {
        var stop = false;

        if (this.isPlaying && this.isPaused == false && this.curAnimation != "")
        {
            this.curTime += dt / 1000;
//            this.curTime += 0.01666;

            for (var a = 0; a < this.clip.nodes.length; a++)
            {
                var node = this.clip.nodes[a];
                var stopped = false;
                var nodeObj;

                if (node.name == "")
                {
                    nodeObj = this.parent;
                }
                else
                {
                    nodeObj = this.clip.menuObjects[node.name];
                }

                // missing key
                if (!nodeObj)
                    continue;

                if (this.ignoreObjects.indexOf (node) != -1)
                    continue;

                if (node.keyframes.length > 1)
                {
                    var curTime = this.curTime;
 
                    var curKeyFrame = node.keyframes[node.lastFrame];
                    var nextFrame = node.lastFrame + 1;
                    var nextKeyFrame = node.keyframes[nextFrame];

                    while (!stopped && curTime >= nextKeyFrame.time)
                    {
                        // looped
                        if (nextFrame == node.keyframes.length - 1)
                        {
                            if (curTime >= this.clip.length)
                            {
                                if (this.isLooping)
                                {
                                    if (this.loopStart)
                                    {
                                        curTime -= this.clip.length;
                                        curTime += this.loopStart;
                                    }
                                    else
                                    {
                                        curTime -= this.clip.length;
                                    }

                                    node.lastFrame = 0;
                                    curKeyFrame = node.keyframes[0];
                                }
                                else
                                {
                                    stopped = true;
                                    curKeyFrame = nextKeyFrame;
                                    curTime = nextKeyFrame.time;
                                }
                            }
                        }
                        else
                        {
                            node.lastFrame++;
                            curKeyFrame = nextKeyFrame;
                        }

                        if (!stopped)
                        {
                            nextFrame = node.lastFrame + 1;
                            nextKeyFrame = node.keyframes[nextFrame];
                        }

                        if (node.key == "m_Sprite")
                        {
                            if (nodeObj[node.key] != curKeyFrame.name)
                            {
                                nodeObj[node.key] = curKeyFrame.name;
                                nodeObj.m_SpriteTouched = true;
                            }
                        }
                        else if (node.key == "m_IsActive")
                        {
                            var touch = true;
                            
                            if (curKeyFrame.value == 0)
                                touch = false;

                            if (nodeObj.renderable != touch)
                            {
                                nodeObj[node.key] = touch;
                                nodeObj.m_IsActiveTouched = true;
                            }
                        }
                    }

                    var curValue = curKeyFrame.value;
                    var nextValue = nextKeyFrame.value;
                    var ratio = (curTime - curKeyFrame.time) / (nextKeyFrame.time - curKeyFrame.time);

                    if (nextKeyFrame.time - curKeyFrame.time == 0)
                        ratio = 1;

                    var value = this.lerp (curValue, nextValue, ratio);
                    
                    if (curKeyFrame.onOff == true)
                        value = curKeyFrame.value;

                    if (node.property)
                    {
                        nodeObj[node.key][node.property] = value;
                        nodeObj[node.key].touched = true;
                    }
                    else
                    {
                        if (node.key == "m_LocalRotation")
                        {
                            nodeObj.m_LocalRotationTouched = true;
                            nodeObj[node.key] = value;
                        }
                    }
                }
            }

            this.updateObject (this.parent);

            for (var obj in this.clip.menuObjects)
            {
                var menuObject = this.clip.menuObjects[obj];
                this.updateObject (menuObject);
            }

            if (this.curTime >= this.clip.length)
            {
                if (this.isLooping)
                    this.curTime -= this.clip.length;
                else
                {
                    this.stop();
                    
                    if (this.onComplete)
                    {
                        this.onComplete (this);
                    }            
                }
            }
        }
    }

    updateObject (menuObject)
    {
        if (!menuObject)
            return;

        var touched = false;
    
        if (this.ignoreObjects.indexOf (menuObject) != -1)
            return;

        if (menuObject.m_IsActiveTouched)
        {
            menuObject.renderable = menuObject.m_IsActive;
            
            if (menuObject instanceof MenuParticle) {
                menuObject.enable(menuObject.m_IsActive);
            }
            
            if (menuObject instanceof MenuScriptEvent &&
                menuObject.m_IsActive) 
            {
                menuObject.fire (this);
            }

            menuObject.m_IsActiveTouched = false;
        }
        
        if (menuObject.m_SpriteTouched)
        {
            if (menuObject.m_Sprite == null)
            {
                menuObject.renderable = false;
                console.log ("Missing m_Sprite: " + menuObject.name);
            }
            else if (menuObject.m_Sprite.indexOf (".png") != -1)
                menuObject.image.texture = PIXI.Texture.fromImage (menuObject.m_Sprite);
            else
                menuObject.image.texture = PIXI.Texture.fromImage (menuObject.m_Sprite + ".png");
            
            menuObject.m_SpriteTouched = false;
        }

        if (menuObject.m_AnchoredPosition.touched)
        {
            menuObject.m_AnchoredPosition.touched = false;
            touched = true;
        }

        if (menuObject.m_LocalScale.touched)
        {
            menuObject.m_LocalScale.touched = false;
            touched = true;
        }

        if (menuObject.m_LocalRotationTouched)
        {
            menuObject.m_LocalRotation = menuObject.m_LocalRotation * (Math.PI * 2) / 360;
            menuObject.m_LocalRotationTouched = false;
            touched = true;
        }

        if (menuObject.m_Color.touched && 
            (menuObject.image || menuObject.text))
        {
            menuObject.color = menuObject.m_Color;
        }

        if (menuObject.m_SizeDelta.touched)
        {
            menuObject.m_SizeDelta.touched = false;

            // update position
            menuObject.updatePosition ();

            // update children????
            
            if (menuObject.image)
            {
                menuObject.updateSize ();
            }
        }
        else if (touched)
            menuObject.updatePosition ();
    }

    lerp(v0, v1, t) 
    {
        return v0*(1-t)+v1*t;
    }
}
