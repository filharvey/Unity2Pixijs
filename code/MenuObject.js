class MenuObject extends PIXI.Container
{
    constructor (data)
    {
        super ();

        this.name = "";
        this.m_IsActive = true;

        if (data)
        {
            this.rectTransform = data.rectTransform;
            this.data = data;
            this.name = this.data.name;

            if (this.data.enabled != null && this.data.enabled != undefined)
            {
                this.m_IsActive = this.data.enabled;
            }
        }

        this.childrenObjects = [];
    }

    init ()
    {
        this.reset ();
        this.updatePosition ();
    }  

    destroy ()
    {
        super.destroy ();
    }

    reset ()
    {
        if (this.rectTransform)
        {
            this.m_Pivot = this.rectTransform.pivot.clone (); 

            this.m_AnchoredPosition = this.rectTransform.anchoredPosition.clone (); 
            this.m_LocalScale = this.rectTransform.localScale.clone (); 
            this.m_LocalRotation = this.rectTransform.localRotation / (180 / Math.PI); 
            this.m_Color = new Color ();
            this.m_SizeDelta = this.rectTransform.sizeDelta.clone ();  
            this.m_SizeDelta.z = 0;
        }

        if (this.data.hasOwnProperty ("enabled"))
        {
            this.m_IsActive = this.renderable = this.data.enabled;
        }
        else
        {
            this.renderable = true;
        }

        this.updatePosition ();
    }

    updatePosition ()
    {
        if (this.parent && this.parent.rectTransform)
        {
            this.scale = this.m_LocalScale.clone ();
            this.anchor = this.m_Pivot.clone ();
            this.rotation = -this.m_LocalRotation;

            if (this.rectTransform.anchorMin.x == this.rectTransform.anchorMax.x)
            {
                this.position.x = this.m_AnchoredPosition.x
                                    - (this.parent.m_SizeDelta.x * this.parent.m_Pivot.x)
                                    + this.parent.m_SizeDelta.x * this.rectTransform.anchorMin.x;
            }
            if (this.rectTransform.anchorMin.y == this.rectTransform.anchorMax.y)
            {
                this.position.y = -this.m_AnchoredPosition.y
                                    + (this.parent.m_SizeDelta.y * this.parent.m_Pivot.y)
                                    - this.parent.m_SizeDelta.y * this.rectTransform.anchorMin.y;
            }
        }
    }

    getChild (name, parent, recursive)
    {
        if (!parent)
            parent = this;

        if (name.indexOf ('/') != -1)
        {
            var nameSplit = name.split ('/');
            var cur = parent;

            for (var a = 0; a < nameSplit.length && cur; a++)
            {
                name = nameSplit[a];

                cur = this.getChild (name, cur, false);
            }

            return cur;
        }

        for (var c in parent.childrenObjects)
        {
            var child = parent.childrenObjects[c];

            if (child.name == name)
                return child;

            if (recursive)
            {
                return this.getChild (name, child)
            }
        }

        return null;
    }
}
