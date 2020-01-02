class MenuImage extends MenuObject
{
    constructor (data)
    {
        super (data);

        this._color = new Color ();

        this._sliceWidth = 0;
        this._sliceHeight = 0;

        this._fillAmount = 0;
    }

    init ()
    {
        super.init ();
    }

    destroy ()
    {
        if (this.fillMask)
        {
            this.fillMask.destory ();
            this.fillMask = null;
        }

        this.image.destroy ();
        this.image = null;

        super.destroy ();
    }

    reset ()
    {
        super.reset ();

        if (this.data.image == undefined)
            console.log (this.name);
            
        this._spriteName = this.data.image.spriteName;
        this.m_Sprite = this.spriteName; 
        
        if (this.image == null)
        {
            switch (this.data.image.fillType)
            {
                case 0:
                    this.image = new PIXI.Sprite (PIXI.Texture.fromImage (this.spriteName));
                    this.image.anchor.x = this.data.rectTransform.pivot.x;
                    this.image.anchor.y = 1 - this.data.rectTransform.pivot.y;
                    break;  
                case 1:
                    this.image = new PIXI.mesh.NineSlicePlane (PIXI.Texture.fromImage (this.spriteName), this.data.image.border.x, this.data.image.border.y, this.data.image.border.z, this.data.image.border.w);
                    this.image.pivot.x = this.data.rectTransform.pivot.x;
                    this.image.pivot.y = 1 - this.data.rectTransform.pivot.y;
                    break;
                case 3: // filled
                    this.image = new PIXI.Sprite (PIXI.Texture.fromImage (this.spriteName));
                    this.image.anchor.x = this.data.rectTransform.pivot.x;
                    this.image.anchor.y = 1 - this.data.rectTransform.pivot.y;

                    //fillMethod - 0 = horizontal
                    //fillMethod - 1 = vertical
                    this._fillAmount = this.data.image.fillAmount;

                    this.fillMask = new PIXI.Graphics();
                    this.fillMask.beginFill();
                    this.fillMask.drawRect(0, 0, this.image.texture.width + 1, this.image.texture.height + 1);
                    this.fillMask.endFill();
                    this.image.addChild(this.fillMask);
                    this.image.mask = this.fillMask;
                    break;  
            }
        }

        this.addChildAt (this.image, 0);

        this.color = this.m_Color.rgba = this.data.image.color.rgba;
        
        this.updateSize ();

        this.updatePosition ();
    }

    updatePosition ()
    {
        super.updatePosition ();

        if (this.image && this.data.image.fillType == 1)
        {
            this.position.y -= this.image.pivot.y * this.image.height;
            this.position.x -= this.image.pivot.x * this.image.width;
        }
    }

    updateSize ()
    {
        if (this.data.image.fillType == 1)
        {
            this._sliceWidth = this.image.width = this.m_SizeDelta.x;
            this._sliceHeight = this.image.height = this.m_SizeDelta.y;
        }
        else if (this.data.image.fillType == 3)
        {
            if (this.data.image.fillMethod == 0) // horizontal
            {
                if (this.data.image.fillOrigin == 0)
                    this.fillMask.position.x = this.image.texture.width / 2 - this.image.texture.width * this.fillAmount;
                else
                    this.fillMask.position.x = -this.image.texture.width / 2;
                
                this.fillMask.position.y = -this.image.texture.height;
                this.fillMask.scale.x = this.fillAmount;
                this.fillMask.scale.y = 1;
            }
            else if (this.data.image.fillMethod == 1) // vertical
            {
                if (this.data.image.fillOrigin == 0)
                    this.fillMask.position.y = -this.image.texture.height * this.fillAmount;
                else
                    this.fillMask.position.y = -this.image.texture.height;
                
                this.fillMask.position.x = -this.image.texture.width / 2;
                this.fillMask.scale.x = 1;
                this.fillMask.scale.y = this.fillAmount;
            }
        }
        else if (this.data.image.fillType == 0)
        {
            if (this.data.image.preserveAspect)
            {
                var aspect = (this.m_SizeDelta.x) / (this.m_SizeDelta.y);
                var textureAspect = this.image.texture.width / this.image.texture.height;
    
                if (aspect != textureAspect)            
                {
                    this.image.width = this.m_SizeDelta.x;
                    this.image.height = this.m_SizeDelta.y;
                }
                else
                {
                    this.image.width = this.m_SizeDelta.x;
                    this.image.height = this.m_SizeDelta.y;
                }
            }
            else
            {
                this.image.width = this.m_SizeDelta.x;
                this.image.height = this.m_SizeDelta.y;
            }
        }
    }

    setDefaultImage ()
    {
        this.image.texture = PIXI.Texture.fromImage (this.spriteName);
    }

    get spriteName ()
    {
        var name = this._spriteName;

        if (this._spriteName == "" || !this._spriteName)
            name = "blank";

        if (name.indexOf (".png") == -1)
            name += ".png";
        
        // need .png?
        return name;
    }

    set spriteName (v)
    {
        this._spriteName = v;
        this.image.texture = PIXI.Texture.fromImage (this.spriteName);
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

    get sliceHeight ()
    {
        if (this.data.image.fillType == 1)
        {
            return this._sliceHeight;
        }

        return this.data.image.height;
    }

    set sliceHeight (v)
    {
        if (this.data.image.fillType == 1)
        {
            this._sliceHeight = v;
            
            this.image.height = Math.min (this._sliceHeight, this.m_SizeDelta.y);
            this.image.height = Math.max (this.image.height, this.data.image.border.y + this.data.image.border.w);

            // set its position
            this.updatePosition ();
        }
        else
        {
            this.image.height = v;
        }
    }

    get sliceWidth ()
    {
        if (this.data.image.fillType == 1)
        {
            return this._sliceWidth;
        }

        return this.data.image.width;
    }

    set sliceWidth (v)
    {
        if (this.data.image.fillType == 1)
        {
            this._sliceWidth = v;
            this.image.width = Math.min (this._sliceWidth, this.m_SizeDelta.x);
            this.image.width = Math.max (this.image.width, this.data.image.border.x + this.data.image.border.z);

            // set its position
            this.updatePosition ();
        }
        else
        {
            this.image.width = v;
        }
    }

    get fillAmount ()
    {
        return this._fillAmount;
    }

    set fillAmount (v)
    {
        this._fillAmount = v;

        this.updateSize ();
    }
}
