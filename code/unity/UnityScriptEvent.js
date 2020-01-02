class UnityScriptEvent
{
    constructor (json)
    {
        this.eventName = "";
        this.args = [];
        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.eventName !== undefined)
        {
            this.eventName = json.eventName;
        }

        if (json.args !== undefined)
        {
            for (var a = 0; a < json.args.length; a++)
            {
                this.args.push (json.args);
            }
        }
    }
}