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

    public class JEParticle : JEResource
    {

        private JEParticle(JSONParticleSystemHelper particle)
        {
            this.unityParticle = particle as JSONParticleSystemHelper;
            allParticles[particle] = this;
            name = particle.filename;
        }

        void preprocess()
        {
            //Debug.Log("preprocess - " + unityTexture);
        }

        void process()
        {
            //Debug.Log("process - " + unityTexture);

            name = unityParticle.filename;
        }

        void postprocess()
        {
            //Debug.Log("postprocess - " + unityTexture);
        }


        public static JEParticle RegisterSprite(JSONParticleSystemHelper sprite)
        {
            if (allParticles.ContainsKey(sprite))
                return allParticles[sprite];

            return new JEParticle(sprite);
        }

        new public static void Preprocess()
        {
            foreach (var sprite in allParticles.Values)
            {
                sprite.preprocess();
            }

        }

        new public static void Process()
        {
            foreach (var sprite in allParticles.Values)
            {
                sprite.process();
            }

        }

        new public static void PostProcess()
        {
            foreach (var sprite in allParticles.Values)
            {
                sprite.postprocess();
            }
        }

        new public static void Reset()
        {
            allParticles = new Dictionary<JSONParticleSystemHelper, JEParticle>();
        }

        public new JSONParticle ToJSON()
        {
            var json = new JSONParticle();

            json.name = name;

            return json;
        }

        public static List<JSONParticle> GenerateJSONParticleList()
        {
            List<JSONParticle> particles = new List<JSONParticle>();

            foreach (var particle in allParticles.Values)
                particles.Add(particle.ToJSON());

            return particles;
        }

        JSONParticleSystemHelper unityParticle;

        public static Dictionary<JSONParticleSystemHelper, JEParticle> allParticles;
    }
}
