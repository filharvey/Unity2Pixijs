class MenuAnimatedImage extends MenuObject
{
    constructor (data)
    {
        super (data);

        this._color = new Color ();
    }

    init ()
    {
        super.init ();
    }

    destroy ()
    {
        this.image.destroy ();
        this.image = null;
        
        super.destroy ();
    }

    reset ()
    {
        super.reset ();

        if (this.image == null)
        {
            var frames = [];

            if (this.data.aimage.frames.length > 0)
            {
                for (var a = 0; a < this.data.aimage.frames.length; a++)
                {
                    var name = this.data.aimage.frames[a];
                    if (name.indexOf (".png") == -1)
                        name += ".png";

                    frames.push (PIXI.Texture.fromImage (name));
                }
            }
            else 
                frames.push (PIXI.Texture.fromImage ("blank.png"));

            this.image = new PIXI.extras.AnimatedSprite (frames);
            this.image.loop = true;
            this.image.animationSpeed = this.data.aimage.frameRate == 0 ? 1 : this.data.aimage.frameRate / 60;
            this.image.play ();
        }
        
        this.image.anchor.x = this.data.rectTransform.pivot.x;
        this.image.anchor.y = 1 - this.data.rectTransform.pivot.y;
        this.addChildAt (this.image, 0);

        this.color = this.data.image.color.rgba;
        this.updateSize();
        this.updatePosition ();
    }

    get color ()
    {
        return this._color;
    }

    set color (color)
    {
        this._color.rgba = color;
        this.image.tint = this._color.colorToTint ();
        this.image.alpha = this._color.a;
    }

    updateSize ()
    {
        if (this.data.image.preserveAspect)
        {
            var aspect = (this.data.rectTransform.sizeDelta.x * this.data.rectTransform.localScale.x) / (this.data.rectTransform.sizeDelta.y * this.data.rectTransform.localScale.y);
            var textureAspect = this.image.textures[0].width / this.image.textures[0].height;

            if (aspect != textureAspect)            
            {
                this.image.width = this.data.rectTransform.sizeDelta.x;
                this.image.height = this.data.rectTransform.sizeDelta.y;
            }
            else
            {
                this.image.width = this.data.rectTransform.sizeDelta.x;
                this.image.height = this.data.rectTransform.sizeDelta.y;
            }
        }
        else
        {
            this.image.width = this.data.rectTransform.sizeDelta.x;
            this.image.height = this.data.rectTransform.sizeDelta.y;
        }
    }
}
