using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace JSONExporter
{
    public class JEScriptEvent : JEComponent
    {
        override public void Preprocess()
        {
            unityScriptEvent = unityComponent as JSONScriptEventHelper;
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONScriptEvent();
            json.type = "ScriptEvent";

            json.eventName = unityScriptEvent.eventName;
            json.args = unityScriptEvent.args;

            return json;
        }

        JSONScriptEventHelper unityScriptEvent;
    }
}