class UnityParticle
{
    constructor (json)
    {
        this.filename = "";
        this.images = [];

        this.useWorldSpace = false;
        
        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.filename !== undefined)    
            this.filename = json.filename;

        if (json.useWorldSpace !== undefined)    
            this.useWorldSpace = json.useWorldSpace;

        if (json.images !== undefined)
        {
            for (var a = 0; a < json.images.length; a++)
            {
                this.images.push (json.images[a]);
            }
        }
    }
}