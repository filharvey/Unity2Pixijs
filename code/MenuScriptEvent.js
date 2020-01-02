class MenuScriptEvent extends MenuObject
{
    constructor (data)
    {
        super (data);
    }

    init ()
    {
        super.init ();
    }

    destroy ()
    {
        super.destroy ();
    }

    reset ()
    {
        super.reset ();
    }

    fire(animator)
    {
        if (animator.onScriptEventHandler)
        {
            animator.onScriptEventHandler (this.data.script.eventName, this.data.script.args);
        }
    }
}
