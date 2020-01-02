class UnityAnimatedImage 
{
    constructor (json)
    {
        this.frameRate = "";

        this.frames = [];

        this.loop = true;

        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.frameRate != undefined)
            this.frameRate = json.frameRate;

        if (json.loop != undefined)
            this.loop = json.loop;

        if (json.frames)
        {
            for (var f in json.frames)
            {
                this.frames.push (json.frames[f]);
            }
        }
    }
}