class UnityText
{
    constructor (json)
    {
        this.text = "";
        this.fontName = "Arial";
        this.fontSize = 0;
        this.alignment = 0;
        this.resizeTextForBestFit = false;
        this.resizeTextMaxSize = 0;
        this.resizeTextMinSize = 0;
        this.lineSpacing = 0;
        this.ignoreBitmapFont = false;

        this.color = new Color ();
        this.raycastTarget = false;
        this.enabled = true;

        this.hOverflow = 0; // 0 = wrap
        this.vOverflow = 0; // 

        this.fontWeight = "normal";
        this.stroke = new Color (0, 0, 0, 1);
        this.strokeThickness = 0;
        this.letterSpacing = 0;
        this.leading = 0;
        this.lineHeight = 0;
        this.padding = 0;
        
        this.dropShadow = false;
        this.dropShadowAlpha = 1;
        this.dropShadowAngle = Math.PI / 6;
        this.dropShadowBlur = 0;
        this.dropShadowColor = new Color (0, 0, 0, 0);
        this.dropShadowDistance = 5;

        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.text !== undefined)    
            this.text = json.text;
        
        if (json.fontName !== undefined)    
            this.fontName = json.fontName;

        if (json.fontSize !== undefined)    
            this.fontSize = json.fontSize;

        if (json.resizeTextForBestFit !== undefined)    
            this.resizeTextForBestFit = json.resizeTextForBestFit;

        if (json.resizeTextMaxSize !== undefined)    
            this.resizeTextMaxSize = json.resizeTextMaxSize;

        if (json.resizeTextMinSize !== undefined)    
            this.resizeTextMinSize = json.resizeTextMinSize;

        if (json.lineSpacing !== undefined)    
            this.lineSpacing = json.lineSpacing;

        if (json.color !== undefined)    
            this.color.rgba = json.color;

        if (json.raycastTarget !== undefined)    
            this.raycastTarget = json.raycastTarget;

        if (json.enabled !== undefined)
            this.enabled = json.enabled;

        if (json.vOverflow !== undefined)    
            this.vOverflow = json.vOverflow;

        if (json.hOverflow !== undefined)    
            this.hOverflow = json.hOverflow;

        if (json.alignment !== undefined)    
            this.alignment = json.alignment;

        if (json.ignoreBitmapFont !== undefined)
            this.ignoreBitmapFont = json.ignoreBitmapFont;

        if (json.fontWeight !== undefined)
            this.fontWeight = json.fontWeight;

        if (json.stroke !== undefined)
            this.stroke.rgba = json.stroke;

        if (json.strokeThickness !== undefined)
            this.strokeThickness = json.strokeThickness;

        if (json.letterSpacing !== undefined)
            this.letterSpacing = json.letterSpacing;

        if (json.lineHeight !== undefined)
            this.lineHeight = json.lineHeight;

        if (json.leading !== undefined)
            this.leading = json.leading;

        if (json.padding !== undefined)
            this.padding = json.padding;

        if (json.dropShadow !== undefined)
            this.dropShadow = json.dropShadow;

        if (json.dropShadowAlpha !== undefined)
            this.dropShadowAlpha = json.dropShadowAlpha;

        if (json.dropShadowAngle !== undefined)
            this.dropShadowAngle = json.dropShadowAngle;

        if (json.dropShadowBlur !== undefined)
            this.dropShadowBlur = json.dropShadowBlur;

        if (json.dropShadowColor !== undefined)
            this.dropShadowColor.rgba = json.dropShadowColor;

        if (json.dropShadowDistance !== undefined)
            this.dropShadowDistance = json.dropShadowDistance;

        // check to make sure it is not empty
        if (this.fontWeight == "")
            this.fontWeight = "normal";

        if (this.fontName == "")
            this.fontName = "Arial";
    }
}