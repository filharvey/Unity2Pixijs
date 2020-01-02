// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details

using System;
using System.IO;
using System.IO.Compression;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEditor;

namespace JSONExporter
{

    public class JESprite : JEResource
    {

        private JESprite(Sprite sprite)
        {
            this.unitySprite = sprite as Sprite;
            allSprites[sprite] = this;
            name = sprite.name;
        }

        void preprocess()
        {
            //Debug.Log("preprocess - " + unityTexture);
        }

        void process()
        {
            //Debug.Log("process - " + unityTexture);

            name = unitySprite.name;
        }

        void postprocess()
        {
            //Debug.Log("postprocess - " + unityTexture);
        }


        public static JESprite RegisterSprite(Sprite sprite)
        {
            if (allSprites.ContainsKey(sprite))
                return allSprites[sprite];

            return new JESprite(sprite);
        }

        new public static void Preprocess()
        {
            foreach (var sprite in allSprites.Values)
            {
                sprite.preprocess();
            }

        }

        new public static void Process()
        {
            foreach (var sprite in allSprites.Values)
            {
                sprite.process();
            }

        }

        new public static void PostProcess()
        {
            foreach (var sprite in allSprites.Values)
            {
                sprite.postprocess();
            }
        }

        new public static void Reset()
        {
            allSprites = new Dictionary<Sprite, JESprite>();
        }

        public new JSONSprite ToJSON()
        {
            var json = new JSONSprite();

            json.name = name;

            return json;
        }

        public static List<JSONSprite> GenerateJSONSpriteList()
        {
            List<JSONSprite> sprites = new List<JSONSprite>();

            foreach (var sprite in allSprites.Values)
                sprites.Add(sprite.ToJSON());

            return sprites;
        }

        Sprite unitySprite;

        public static Dictionary<Sprite, JESprite> allSprites;
    }
}
