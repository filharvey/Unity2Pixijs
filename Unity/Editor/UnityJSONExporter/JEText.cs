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

    public class JEText : JEComponent
    {

        override public void Preprocess()
        {
            unityText = unityComponent as JSONTextHelper;
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONText();
            json.type = "Text";

            json.enabled = unityText.enabled;

            if (unityText.text)
            {
                json.color = unityText.text.color;
                json.raycastTarget = unityText.text.raycastTarget;

                json.text = unityText.text.text;
                json.fontSize = unityText.text.fontSize;
                json.resizeTextForBestFit = unityText.text.resizeTextForBestFit;
                json.resizeTextMaxSize = unityText.text.resizeTextMaxSize;
                json.resizeTextMinSize = unityText.text.resizeTextMinSize;
                json.lineSpacing = unityText.text.lineSpacing;
                json.alignment = (int)unityText.text.alignment;
                json.hOverflow = (int)unityText.text.horizontalOverflow;
                json.vOverflow = (int)unityText.text.verticalOverflow;
                json.ignoreBitmapFont = unityText.ignoreBitmapFont;

                json.fontWeight = unityText.fontWeight;
                json.stroke = unityText.stroke;
                json.strokeThickness = unityText.strokeThickness;

                json.leading = unityText.leading;
                json.letterSpacing = unityText.letterSpacing;
                json.lineHeight = unityText.lineHeight;
                json.padding = unityText.padding;

                json.dropShadow = unityText.dropShadow;
                json.dropShadowAlpha = unityText.dropShadowAlpha;
                json.dropShadowAngle = unityText.dropShadowAngle;
                json.dropShadowBlur = unityText.dropShadowBlur;
                json.dropShadowColor = unityText.dropShadowColor;
                json.dropShadowDistance = unityText.dropShadowDistance;
            }

            json.fontName = unityText.fontName;

            return json;
        }

        JSONTextHelper unityText;
    }
}
