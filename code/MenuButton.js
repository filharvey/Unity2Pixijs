class MenuButton extends MenuImage
{
    constructor (data)
    {
        super (data);

        this._pressed = false;
        this._hover = false;
        this._disabled = false;

        this._stopDownPropagation = true;
        this._stopUpPropagation = true;
        this._stopOverPropagation = true;
        this._stopOutPropagation = true;
    }

    init ()
    {
        super.init ();

        this.image.on ('pointerup', this._onPointerUp.bind(this));
        this.image.on ('pointerupoutside', this._onPointerUp.bind(this));
        this.image.on ('pointerdown', this._onPointerDown.bind(this));
        this.image.on ('pointerover', this._onPointerOver.bind(this));
        this.image.on ('pointerout', this._onPointerOut.bind(this));

        this.onPointerUp = null;
        this.onPointerDown = null;
        this.onPointerOver = null;
        this.onPointerOut = null;
    }

    destroy ()
    {
        this.image.off ('pointerup', this._onPointerUp.bind(this));
        this.image.off ('pointerupoutside', this._onPointerUp.bind(this));
        this.image.off ('pointerdown', this._onPointerDown.bind(this));
        this.image.off ('pointerover', this._onPointerOver.bind(this));
        this.image.off ('pointerout', this._onPointerOut.bind(this));

        this.onPointerUp = null;
        this.onPointerDown = null;
        this.onPointerOver = null;
        this.onPointerOut = null;

        super.destroy ();
    }

    reset ()
    {
        super.reset ();

// add button events        
        this.image.interactive = this.data.button.interactable;

        if (this.data.button.transition == 1)
            this.color.rgba = this.data.image.color.mul (this.data.button.normalColor);
        
        this.image.tint = this.color.colorToTint ();

        this._pressedSprite = this.data.button.pressedSprite;
        this._highlightedSprite = this.data.button.highlightedSprite;
        this._disabledSprite = this.data.button.disabledSprite;
    }

    get disabled ()
    {
        return this._disabled;
    }

    set disabled (v)
    {
        this._disabled = v;

        this.updateInteractiveState ();
    }


    get interactive ()
    {
        return this.image.interactive;
    }

    set interactive (v)
    {
        if (this.image)
        {
            this.image.interactive = v;
            
            this.updateInteractiveState ();
        }
    }

    get pressedSpriteName ()
    {
        if (!this._pressedSprite || this._pressedSprite == "")
            return null;

        var name = this._pressedSprite;

        if (this._pressedSprite == "")
            name = "blank";
    
        if (name.indexOf (".png") == -1)
            name += ".png";
    
// need .png?
        return name;
    }

    set pressedSpriteName (v)
    {
        this._pressedSprite = v;

        this.updatePressedState ();
    }

    get highlightedSpriteName ()
    {
        if (!this._highlightedSprite || this._highlightedSprite == "")
            return null;

        var name = this._highlightedSprite;

        if (this._highlightedSprite == "")
            name = "blank";
    
        if (null.indexOf (".png") == -1)
            name += ".png";

// need .png?
        return name;
    }

    set highlightedSpriteName (v)
    {
        this._highlightedSprite = v;
    }

    get disabledSpriteName ()
    {
        if (!this._disabledSprite || this._disabledSprite == "")
            return null;

        var name = this._disabledSprite;

        if (this._disabledSprite == "")
            name = "blank";

        if (name.indexOf (".png") == -1)
            name += ".png";

        // need .png?
        return name;
    }

    set disabledSpriteName (v)
    {
        this._disabledSprite = v;

        this.updateInteractiveState ();        
    }

    _onPointerDown (e)
    {
        this._pressed = true;

        this.updatePressedState ();

        if (this.onPointerDown)
            this.onPointerDown (e);

        if (this._stopDownPropagation)
            e.stopPropagation();
    }

    updateInteractiveState ()
    {
        // change color or texture?
        switch (this.data.button.transition)
        {
            case 0: // none
                break;

            case 1: // color Tint;
                if (this.image.interactive && this._disabled == false)
                    this.color.rgba = this.data.image.color.mul (this.data.button.normalColor);
                else
                    this.color.rgba = this.data.image.color.mul (this.data.button.disabledColor);
                break;

            case 2: // sprite swap
                if ((this.image.interactive && this._disabled == false) || !this.disabledSpriteName)
                    this.image.texture = PIXI.Texture.fromImage (this.spriteName);
                else if (this.disabledSpriteName)
                    this.image.texture = PIXI.Texture.fromImage (this.disabledSpriteName);
                break;
        }

        this.image.tint = this.color.colorToTint ();
    }

    updatePressedState ()
    {
        // change color or texture?
        switch (this.data.button.transition)
        {
            case 0: // none
                break;

            case 1: // color Tint;
                if (this._pressed && this._disabled != false)
                    this.color.rgba = this.data.image.color.mul (this.data.button.pressedColor);
                else
                {
                    if (this._disabled == false)
                        this.color.rgba = this.data.image.color.mul (this.data.button.normalColor);
                    else
                        this.color.rgba = this.data.image.color.mul (this.data.button.disabledColor);
                }
                break;

            case 2: // sprite swap
                if (this._pressed && this._disabled != false)
                {
                    if (this.pressedSpriteName)
                        this.image.texture = PIXI.Texture.fromImage (this.pressedSpriteName);
                }
                else
                {
                    if (this._disabled == false || !this.disabledSpriteName)
                        this.image.texture = PIXI.Texture.fromImage (this.spriteName);
                    else if (this.disabledSpriteName)
                        this.image.texture = PIXI.Texture.fromImage (this.disabledSpriteName);
                }
                break;
        }

        this.image.tint = this.color.colorToTint ();
    }

    _onPointerUp (e)
    {
        this._pressed = false;

        this.updatePressedState ();

        if (this.onPointerUp)
            this.onPointerUp (e);

        if (this._stopUpPropagation)
            e.stopPropagation()
    }

    _onPointerOver (e)
    {
        this._hover = true;

        if (this.onPointerOver)
            this.onPointerOver (e);

        if (this._stopOverPropagation)
            e.stopPropagation()
    }

    _onPointerOut (e)
    {
        this._hover = false;

        if (this.onPointerOut)
            this.onPointerOut (e);

        if (this._stopOutPropagation)
            e.stopPropagation()
    }
}
