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

    public class JEAnimator : JEComponent
    {
        override public void Preprocess()
        {
            unityAnimator = unityComponent as Animator;
        }

        override public void QueryResources()
        {
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONAnimator();
            json.type = "Animator";
            return json;
        }

        Animator unityAnimator;
    }
}
