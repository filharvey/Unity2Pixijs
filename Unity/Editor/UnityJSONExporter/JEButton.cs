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

    public class JEButton : JEComponent
    {

        override public void Preprocess()
        {
            unityButton = unityComponent as Button;
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONButton();
            json.type = "Button";
            json.interactable = unityButton.interactable;
            json.transition = (int) unityButton.transition;

            switch (unityButton.transition)
            {
                case Selectable.Transition.ColorTint:
                    json.normalColor = unityButton.colors.normalColor;
                    json.disabledColor = unityButton.colors.disabledColor;
                    json.pressedColor = unityButton.colors.pressedColor;
                    json.highlightedColor = unityButton.colors.highlightedColor;
                    json.colorMultiplier = unityButton.colors.colorMultiplier;
                    break;

                case Selectable.Transition.SpriteSwap:
                    if (unityButton.spriteState.disabledSprite)
                        json.disabledSprite = unityButton.spriteState.disabledSprite.name;
                    if (unityButton.spriteState.highlightedSprite)
                        json.highlightedSprite = unityButton.spriteState.highlightedSprite.name;
                    if (unityButton.spriteState.pressedSprite)
                        json.pressedSprite = unityButton.spriteState.pressedSprite.name;
                    break;
            }

            return json;
        }

        Button unityButton;
    }
}
