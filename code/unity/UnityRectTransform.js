class UnityRectTransform
{
    constructor (json)
    {
        this.localRotation = 0;
        this.localScale = new PIXI.Point (1, 1);

        this.anchoredPosition = new PIXI.Point ();
        this.anchorMax = new PIXI.Point (0.5, 0.5);
        this.anchorMin = new PIXI.Point (0.5, 0.5);
        this.pivot = new PIXI.Point (0.5, 0.5);
        this.sizeDelta = new PIXI.Point ();

        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.anchoredPosition !== undefined)
        {
            this.anchoredPosition.x = json.anchoredPosition.x;
            this.anchoredPosition.y = json.anchoredPosition.y;
        }

        if (json.anchorMax !== undefined)
        {
            this.anchorMax.x = json.anchorMax.x;
            this.anchorMax.y = json.anchorMax.y;
        }

        if (json.anchorMin !== undefined)
        {
            this.anchorMin.x = json.anchorMin.x;
            this.anchorMin.y = json.anchorMin.y;
        }

        if (json.pivot !== undefined)
        {
            this.pivot.x = json.pivot.x;
            this.pivot.y = json.pivot.y;
        }

        if (json.sizeDelta !== undefined)
        {
            this.sizeDelta.x = json.sizeDelta.x;
            this.sizeDelta.y = json.sizeDelta.y;
        }

        if (json.localRotation !== undefined)
        {
            this.localRotation = json.localRotation;
        }

        if (json.localScale !== undefined)
        {
            this.localScale.x = json.localScale.x;
            this.localScale.y = json.localScale.y;
        }
    }
}