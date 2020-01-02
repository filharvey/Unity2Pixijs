// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details

using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEditor;
using UnityEngine.UI;

namespace JSONExporter
{

    public class JECanvasScaler : JEComponent
    {

        override public void Preprocess()
        {
            unityCanvasScaler = unityComponent as CanvasScaler;
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONCanvasScaler();
            json.type = "CanvasScaler";
            json.referenceResolution = unityCanvasScaler.referenceResolution;
            json.referencePixelsPerUnit = unityCanvasScaler.referencePixelsPerUnit;
            return json;
        }

        CanvasScaler unityCanvasScaler;
    }
}
