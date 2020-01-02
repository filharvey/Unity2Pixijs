// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details

using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEditor;

namespace JSONExporter
{

    public class JEResource : JEObject
    {
        public static void Reset()
        {
            JEMesh.Reset();
            JEMaterial.Reset();
            JETexture.Reset();
            JEShader.Reset();
            JELightmap.Reset();
            JESprite.Reset();
            JEParticle.Reset();
        }

        public static void Preprocess()
        {
            JETexture.Preprocess();
            JEShader.Preprocess();
            JEMaterial.Preprocess();
            JELightmap.Preprocess();
            JEMesh.Preprocess();
            JESprite.Preprocess();
            JEParticle.Preprocess();
        }

        public static void Process()
        {
            JETexture.Process();
            JEShader.Process();
            JEMaterial.Process();
            JELightmap.Process();
            JEMesh.Process();
            JESprite.Process();
            JEParticle.Process();
        }

        public static void PostProcess()
        {
            JETexture.PostProcess();
            JEShader.PostProcess();
            JEMaterial.PostProcess();
            JELightmap.PostProcess();
            JEMesh.PostProcess();
            JESprite.PostProcess();
            JEParticle.PostProcess();
        }

        public static JSONResources GenerateJSONResources()
        {
            var json = new JSONResources();

            /*            json.textures = JETexture.GenerateJSONTextureList();
                        json.lightmaps = JELightmap.GenerateJSONLightmapList();
                        json.shaders = JEShader.GenerateJSONShaderList();
                        json.materials = JEMaterial.GenerateJSONMaterialList();
                        json.meshes = JEMesh.GenerateJSONMeshList();
            */
            json.sprites = JESprite.GenerateJSONSpriteList();
            json.particles = JEParticle.GenerateJSONParticleList();

            return json;
        }
    }
}
