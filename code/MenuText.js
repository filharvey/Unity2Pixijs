class MenuText extends MenuObject
{
    constructor (data)
    {
        super (data);

        this._color = new Color ();
        this.resizeTextForBestFit = false;
        this.minFontSize = this.data.text.resizeTextMinSize;
        this.maxFontSize = this.data.text.resizeTextMaxSize;
    }

    init ()
    {
        super.init ();
    }

    destory ()
    {
        this._text.destory ();
        this._text = null;

        super.destroy ();
    }

    reset ()
    {
        super.reset ();

        //
        if (this._text == null)
        {
            if (this.data.text.ignoreBitmapFont)
            {
                var style = new PIXI.TextStyle({
                    fontFamily: this.data.text.fontName,
                    fontSize: this.data.text.fontSize,
                    fontWeight: this.data.text.fontWeight,
                    stroke: this.data.text.stroke.Hex,
                    strokeThickness: this.data.text.strokeThickness,
                    leading: this.data.text.leading,
                    letterSpacing: this.data.text.letterSpacing,
                    lineHeight: this.data.text.lineHeight,
                    fill:  this.data.text.color.Hex, 
                    dropShadow: this.data.text.dropShadow,
                    dropShadowAlpha: this.data.text.dropShadowAlpha,
                    dropShadowAngle: this.data.text.dropShadowAngle,
                    dropShadowBlur: this.data.text.dropShadowBlur,
                    dropShadowColor: this.data.text.dropShadowColor.Hex,
                    dropShadowDistance: this.data.text.dropShadowDistance,
                    padding: this.data.text.padding,
                    align: this.alignment
                });

                if (this.data.text.hOverflow == 0)
                {
                    style.wordWrap = true;
                    style.wordWrapWidth = this.data.rectTransform.sizeDelta.x;
                }
            
                this._text = new PIXI.Text(this.data.text.text, style);
                this._text.updateText ();
                
                if (this.data.text.resizeTextForBestFit)
                {
                    this.resizeTextForBestFit = this.data.text.resizeTextForBestFit;
                    this.minFontSize = this.data.text.resizeTextMinSize;
                    this.maxFontSize = this.data.text.resizeTextMaxSize;
                    this.checkWidth ();
                }
            }
            else if (PIXI.extras.BitmapText.fonts[this.data.text.fontName])
            {
                this._text = new PIXI.extras.BitmapText(this.data.text.text, {
                    font: {
                        name: this.data.text.fontName, 
                        size: this.data.text.fontSize,
                        align: this.alignment
                    }
                });

                this._text.align = this.alignment;

                if (this.data.text.hOverflow == 0)
                    this._text.maxWidth = this.data.rectTransform.sizeDelta.x;
                else
                    this._text.maxWidth = 0;

                this._text.updateText ();

                if (this.data.text.resizeTextForBestFit)
                {
                    this.resizeTextForBestFit = this.data.text.resizeTextForBestFit;
                    this.minFontSize = this.data.text.resizeTextMinSize;
                    this.maxFontSize = this.data.text.resizeTextMaxSize;
                    this._text.maxWidth = 0;
                    this.checkWidth ();
                }
            }
            else
            {
                console.log ("NO Font: " + this.data.text.fontName);
    
                    this._text = new PIXI.Text(this.data.text.text, {
                    fontFamily: 'Arial',
                    fontSize: this.data.text.fontSize,
                    fill: 'white', 
                    align: this.alignment
                });
            }
        }

        this._text.anchor.x = this.data.rectTransform.pivot.x;
        this._text.anchor.y = 1 - this.data.rectTransform.pivot.y;
        this.color = this.data.text.color;

        this.addChildAt (this._text, 0);    
    }

    get alignment ()
    {
        switch (this.data.text.alignment)
        {
            case 0: // top left
                return "left";
            case 1: // top centr
                return "center";
            case 2: // top right
                return "right";
            case 3: // middle left
                return "left";
            case 4:  // middle center
                return "center";
            case 5:  // middle right
                return "right";
            case 6: // bottom left
                return "left";
            case 7:  // bottom center
                return "center";
            case 8:  // bottom right
                return "right";
        }

        return 0;
    }

    get color ()
    {
        return this._color;
    }

    set color (color)
    {
        this._color.rgba = color;

        if (this.data.text.ignoreBitmapFont)
        {
            this._text._style.fill = this._color.Hex
        }
        else
        {
            this._text.tint = this._color.colorToTint ();
        }
        this._text.alpha = this._color.a;
    }

    get text ()
    {
        return this._text.text;
    }

    set text (v)
    {
        this._text.text = v;

        if (this.resizeTextForBestFit)
        {
            this.checkWidth ();
        }
    }

    checkWidth ()
    {
        var fontSize = this.maxFontSize;
        
        if (this._text instanceof PIXI.extras.BitmapText)
        {
            this._text._font.size = fontSize;
            this._text.updateText ();

            while (this._text.textWidth > this.data.rectTransform.sizeDelta.x &&
                fontSize >= this.minFontSize)
            {
                fontSize--;
                this._text._font.size = fontSize;
                this._text.updateText ();
            }
        }
        else
        {
            this._text._style.fontSize = fontSize;
            this._text.updateText ();

            while (this._text.width > this.data.rectTransform.sizeDelta.x &&
                fontSize >= this.minFontSize)
            {
                fontSize--;
                this._text._style.fontSize = fontSize;
                this._text.updateText ();
            }
        }
    }
}
