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

    public class JEParticleSystem : JEComponent
    {

        override public void Preprocess()
        {
            unityParticle = unityComponent as JSONParticleSystemHelper;
        }

        override public void QueryResources()
        {
            if (unityParticle)
                JEParticle.RegisterSprite(unityParticle);
        }


        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONParticleSystem();
            json.type = "ParticleSystem";

            json.enabled = unityParticle.enabled;
            json.filename = unityParticle.filename;
            json.useWorldSpace = unityParticle.useWorldSpace;

            json.images = new List<string>();

            for (int f = 0; f < unityParticle.images.Count; f++)
            {
                json.images.Add(unityParticle.images[f]);
            }


            return json;
        }

        JSONParticleSystemHelper unityParticle;
    }
}
