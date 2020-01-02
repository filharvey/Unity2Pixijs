// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details

using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEditor;

namespace JSONExporter
{

    public class JETransformRect : JEComponent
    {

        override public void Preprocess()
        {
            unityRectTransform = unityComponent as RectTransform;
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONRectTransform();
            json.type = "RectTransform";
            json.localPosition = unityRectTransform.localPosition;
            json.localRotation = unityRectTransform.localEulerAngles.z;
            json.localScale = unityRectTransform.localScale;

            json.anchoredPosition = unityRectTransform.anchoredPosition;
            json.anchorMax = unityRectTransform.anchorMax;
            json.anchorMin = unityRectTransform.anchorMin;
            json.offsetMax = unityRectTransform.offsetMax;
            json.offsetMin = unityRectTransform.offsetMin;
            json.pivot = unityRectTransform.pivot;
            json.sizeDelta = unityRectTransform.sizeDelta;

            return json;
        }

        RectTransform unityRectTransform;

    }
}