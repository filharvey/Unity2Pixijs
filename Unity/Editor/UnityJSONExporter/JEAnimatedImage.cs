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
    public class JEAnimatedImage : JEComponent
    {
        override public void Preprocess()
        {
            unityImage = unityComponent as AnimatedImage;
        }

        override public void QueryResources()
        {
            // register each sprite frame
            if (unityImage.frames.Count > 0)
            {
                for (int f = 0; f < unityImage.frames.Count; f++)
                {
                    JESprite.RegisterSprite(unityImage.frames[f]);
                }
            }
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONAnimatedImage();
            json.type = "AnimatedImage";

            json.frameRate = unityImage.frameRate;
            json.loop = unityImage.loop;

            json.frames = new List<string>();

            for (int f = 0; f < unityImage.frames.Count; f++)
            {
                json.frames.Add(unityImage.frames[f].name);
            }

            return json;
        }

        AnimatedImage unityImage;
    }
}
