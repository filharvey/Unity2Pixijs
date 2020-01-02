class Menu extends MenuObject
{
    constructor (json)
    {
        super ();

        this.scaleFactor = new PIXI.Point (1, 1);
        this.data = json;
        this.referenceResolution = new PIXI.Point ();

        //console.log("Menu",this.data.name);
        
        this.processHierarchy (this.data);

        this.reset ();

        this.position.x = 0;
        this.position.y = 0;

        this.animations = {};

        this.tempParticleTag = null;
    }

    reset ()
    {
        super.reset ();

        this.resetChildren (this);
    }

    destroy ()
    {
        this.destroyChilren (this);

        this.animations = [];
        
        super.destroy ();
    }

    destroyChilren (parent)
    {
        for (var c in parent.childrenObjects)
        {
            var child = parent.childrenObjects[c];

            if (child.animation)
            {
                child.animation.destroy ();
            }

            this.destroyChilren (child);

            child.destroy ();
        }
    }   

    resetChildren (parent)
    {
        for (var c in parent.childrenObjects)
        {
            var child = parent.childrenObjects[c];

            child.reset ();

            if (child.animation)
            {
                child.animation.reset ();
            }
            
            this.resetChildren (child);
        }
    }   

    processHierarchy ()
    {
        for (var o in this.data.hierarchy)
        {
            var object = this.data.hierarchy[o];
            var isBase = false;

            for (var c in object.components)
            {
                var comp = object.components[c];
                
                if (comp.type == "CanvasScaler")
                {
                    // base object
                    this.referenceResolution.x = comp.referenceResolution.x;
                    this.referenceResolution.y = comp.referenceResolution.y;
                    isBase = true;
                }
                else if (comp.type == 'RectTransform')
                {
                    this.rectTransform = new UnityRectTransform (comp);
                    this.rectTransform.pivot.x = this.rectTransform.pivot.y = 0;
                    this.rectTransform.localRotation = this.rectTransform.localRotation = 0;
                    this.rectTransform.localScale.x = this.rectTransform.localScale.y = 1;
                    this.rectTransform.anchoredPosition.x = this.rectTransform.anchoredPosition.y = 0;

                    this.rectTransform.sizeDelta.x = Menu.width;
                    this.rectTransform.sizeDelta.y = Menu.height;
                }
            }

            if (isBase)
            {
                this.init ();
                this.processChildren (this, object);
            }
        }
    }

    processChildren (parent, parentData)
    {
        for (var c in parentData.children)
        {
            var child = parentData.children[c];
            var obj = null;
            var data = {
                rectTransform: null,
                name: child.name,
                enabled: child.enabled
            };

            for (var c in child.components)
            {
                var comp = child.components[c];

                //console.log("comp.type:",comp.type);
                switch (comp.type)
                {
                    case 'RectTransform':
                        data.rectTransform = new UnityRectTransform (comp);
                        break;

                    case 'Image':
                        data.image = new UnityImage (comp);
                        break;

                    case 'AnimatedImage':
                        data.aimage = new UnityAnimatedImage (comp);
                        break;

                    case 'Animation':
                        data.animation = new UnityAnimation (comp);
                        break;

                    case 'Button':
                        data.button = new UnityButton (comp);
                        break;

                    case 'Text':
                        data.text = new UnityText (comp);
                        break;

                    case 'ParticleSystem':
                        data.particle = new UnityParticle (comp);
                        break;

                    case 'ScriptEvent':
                        data.script = new UnityScriptEvent (comp);
                        break;
                }
            }

            if (data.button)
            {
                // create an image
                obj = new MenuButton (data);
            }
            else if (data.aimage)
            {
                // create an animated image
                obj = new MenuAnimatedImage (data);
            }
            else if (data.image)
            {
                // create an image
                obj = new MenuImage (data);
            }
            else if (data.text)
            {
                // create an image
                obj = new MenuText (data);
            }
            else if (data.script)
            {
                obj = new MenuScriptEvent (data);
            }
            else if (data.particle)
            {
                if (this.tempParticleTag != null) {
                    data.particleTag = this.tempParticleTag;
                    data.particleKey = this.tempParticleTag + "_" + Menu.tempParticleCounter.toString();
                    Menu.tempParticleCounter++;
                }

                obj = new MenuParticle (data);
            }
            else
            {
                // default object
                obj = new MenuObject (data);
            }

            if (data.animation)
            {
                this.tempParticleTag = "MenuAnimation.js-" + data.name + "_" + (Menu.tempParticleKeyCounter++).toString ();
                data.particleTag = this.tempParticleTag;
                obj.animation = new MenuAnimation (data, obj);
            }

            if (!data.rectTransform)
            {
                console.warn ("Missing Rect Transform: " + child.name);
            }

            parent.addChild (obj);
            parent.childrenObjects.push (obj);

            obj.init ();

            this.processChildren (obj, child);
        }
    }

    update (dt)
    {
        if (this.animations)
        {
            for (var o in this.animations)
            {
                var obj = this.animations[o];

                obj.update (dt);
            }
        }
    }

    play (child, name, loop, onComplete)
    {
        var obj = this.getChild (child);

        if (obj && obj.animation)
        {
            obj.animation.stop ();
            obj.animation.reset ();
            
            if (obj.animation.play (name, loop, onComplete))
            {
                this.animations[child] = obj.animation;
            }
        }
    }

    stop (child)
    {
        var obj = this.getChild (child);

        if (obj && obj.animation && this.animations[child])
        {
            this.animations[child].stop ();
            delete this.animations[child];
        }
    }
}

Menu.width = 0;
Menu.height = 0;

Menu.tempParticleCounter = 0;
Menu.tempParticleKeyCounter = 0;