class UnityImage
{
    constructor (json)
    {
        this.spriteName = "";
        this.minHeight = 0;
        this.minWidth = 0;
        this.preferredHeight = 0;
        this.preferredWidth = 0;
        this.preserveAspect = true;
        this.color = new Color ();
        this.raycastTarget = false;
        this.enabled = true;
        this.fillType = 0;
        this.fillOrigin = 0;
        this.fillAmount = 0;
        this.fillMethod = 0;
        this.border = {
            x: 0, 
            y: 0,
            z: 0,
            w: 0
        }

        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.spriteName)    
            this.spriteName = json.spriteName;
        
        if (json.minHeight)    
            this.minHeight = json.minHeight;

        if (json.minWidth)    
            this.minWidth = json.minWidth;

        if (json.preferredHeight)    
            this.preferredHeight = json.preferredHeight;

        if (json.preferredWidth)    
            this.preferredWidth = json.preferredWidth;

        if (json.preserveAspect)    
            this.preserveAspect = json.preserveAspect;

        if (json.color)    
            this.color.rgba = json.color;

        if (json.raycastTarget)    
            this.raycastTarget = json.raycastTarget;

        if (json.enabled)    
            this.enabled = json.enabled;

        if (json.fillType)    
            this.fillType = json.fillType;

        if (json.fillAmount)    
            this.fillAmount = json.fillAmount;

        if (json.fillMethod)    
            this.fillMethod = json.fillMethod;

        if (json.fillOrigin)    
            this.fillOrigin = json.fillOrigin;

        if (json.border)    
        {
            this.border.x = json.border.x;
            this.border.y = json.border.y;
            this.border.z = json.border.z;
            this.border.w = json.border.w;
        }
    }
}