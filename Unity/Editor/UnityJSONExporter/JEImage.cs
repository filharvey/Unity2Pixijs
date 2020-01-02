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

    public class JEImage : JEComponent
    {
        override public void Preprocess()
        {
            unityImage = unityComponent as Image;
        }

        override public void QueryResources()
        {
            if (unityImage.sprite)
                JESprite.RegisterSprite(unityImage.sprite);
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONImage();
            json.type = "Image";
            if (unityImage.sprite)
                json.spriteName = unityImage.sprite.name;

            json.color = unityImage.color;
            json.enabled = unityImage.enabled;
            json.raycastTarget = unityImage.raycastTarget;

            json.preferredHeight = unityImage.preferredHeight;
            json.preferredWidth = unityImage.preferredWidth;
            json.preserveAspect = unityImage.preserveAspect;
            json.color = unityImage.color;
            json.fillType = (int) unityImage.type;

            if (unityImage.type == Image.Type.Sliced)
            {
                json.border = unityImage.sprite.border;
            }
            else if (unityImage.type == Image.Type.Filled)
            {
                json.fillMethod = (int)unityImage.fillMethod;
                json.fillAmount = unityImage.fillAmount;
                json.fillOrigin = unityImage.fillOrigin;
            }

            return json;
        }

        Image unityImage;
    }
}
