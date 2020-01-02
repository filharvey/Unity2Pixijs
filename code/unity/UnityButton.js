class UnityButton
{
    constructor (json)
    {
        this.interactable = false;
        this.transition = 0;

        this.normalColor = new Color (0, 0, 0, 0);
        this.disabledColor = new Color (0, 0, 0 ,0);
        this.pressedColor = new Color (0, 0, 0, 0);
        this.highlightedColor = new Color (0, 0, 0, 0);

        this.colorMultiplier = 1;

        this.disabledSprite = "";
        this.highlightedSprite = "";
        this.pressedSprite = "";

        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.interactable)    
            this.interactable = json.interactable;

        if (json.transition)    
            this.transition = json.transition;

        if (json.normalColor)    
            this.normalColor.rgba = json.normalColor;

        if (json.disabledColor)    
            this.disabledColor.rgba = json.disabledColor;

        if (json.highlightedColor)    
            this.highlightedColor.rgba = json.highlightedColor;

        if (json.pressedColor)    
            this.pressedColor.rgba = json.pressedColor;

        if (json.colorMultiplier)    
            this.colorMultiplier = json.colorMultiplier;

        if (json.disabledSprite)    
            this.disabledSprite = json.disabledSprite;

        if (json.highlightedSprite)    
            this.highlightedSprite = json.highlightedSprite;

        if (json.pressedSprite)    
            this.pressedSprite = json.pressedSprite;
    }
}