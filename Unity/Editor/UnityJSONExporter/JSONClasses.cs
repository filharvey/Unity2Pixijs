// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details

using System;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEditor;

namespace JSONExporter
{

    public class JSONTexture
    {
        public string name;
        public string base64PNG;
        public int base64PNGLength;
    }

    public class JSONShader
    {
        public string name;
        public int renderQueue;
    }

    public class JSONMaterial
    {
        public string name;
        public string shader;
        public string mainTexture;
        public Vector2 mainTextureOffset;
        public Vector2 mainTextureScale;
        public int passCount;
        public int renderQueue;
        public string[] shaderKeywords;
        public Color color;

    }

    public class JSONBoneWeight
    {
        public int[] indexes = new int[4];
        public float[] weights = new float[4];
    }

    public class JSONMesh
    {
        public string name;
        public int subMeshCount;
        public int[][] triangles;
        public int vertexCount;
        public Vector3[] vertexPositions;
        public Vector2[] vertexUV;
        public Vector2[] vertexUV2;
        public Color[] vertexColors;
        public Vector3[] vertexNormals;
        public Vector4[] vertexTangents;
        public Matrix4x4[] bindPoses;
        public JSONBoneWeight[] boneWeights;
        public JSONTransform[] bones;
        public string rootBone;
    }

    public class JSONSprite
    {
        public string name;
    }

    public class JSONParticle
    {
        public string name;
    }

    public class JSONLightmap
    {
        public string filename;
        public string base64PNG;
        public int base64PNGLength;
    }

    public class JSONGameObject
    {
        public string name;
        public List<JSONComponent> components;
        public List<JSONGameObject> children;
        public bool enabled;

        public T GetComponent<T>() where T : JSONComponent
        {
            foreach (var component in components)
                if (component.GetType() == typeof(T))
                    return (T)component;

            return null;
        }
    }

    public class JSONComponent
    {
        public string type;
    }

    public class JSONAnimator : JSONComponent
    {
    }

    public class JSONCanvasScaler : JSONComponent
    {
        public Vector2 referenceResolution;
        public float referencePixelsPerUnit;
    }

    public class JSONGraphic : JSONComponent
    {
        public Color color;
        public bool raycastTarget;
        public bool enabled;
    }

    public class JSONImage : JSONGraphic
    {
        public string spriteName;
        public float minHeight;
        public float minWidth;
        public float preferredHeight;
        public float preferredWidth;
        public bool preserveAspect;
        public int fillType;
        public int fillMethod;
        public float fillAmount;
        public int fillOrigin;

        public Vector4 border;
    }

    public class JSONAnimatedImage : JSONComponent
    {
        public float frameRate;

        public bool loop;

        public List<string> frames;
    }

    public class JSONScriptEvent: JSONComponent
    {
        public string eventName;

        public List<string> args;
    }

    public class JSONParticleSystem : JSONGraphic
    {
        public string filename;

        public List<string> images;
        public bool useWorldSpace;
    }

    public class JSONText : JSONGraphic
    {
        public string text;
        public string fontName;
        public float fontSize;
        public bool resizeTextForBestFit;
        public float resizeTextMaxSize;
        public float resizeTextMinSize;
        public float lineSpacing;
        public int alignment;
        public int hOverflow;
        public int vOverflow;
        public bool ignoreBitmapFont;

        public string fontWeight;
        public Color stroke;
        public float strokeThickness;

        public float leading;
        public float letterSpacing;
        public float lineHeight;
        public float padding;

        public bool dropShadow;
        public float dropShadowAlpha;
        public float dropShadowAngle;
        public float dropShadowBlur;
        public Color dropShadowColor;
        public float dropShadowDistance;
    }

    public class JSONButton : JSONComponent
    {
        public bool interactable;
        public int transition;
        public Color normalColor;
        public Color disabledColor;
        public Color pressedColor;
        public Color highlightedColor;
        public float colorMultiplier;

        public string disabledSprite;
        public string pressedSprite;
        public string highlightedSprite;
    }

    public class JSONTransform : JSONComponent
    {
        public Vector3 localPosition;
        public float localRotation;
        public Vector3 localScale;
        public String name;
        public String parentName;
    }

    public class JSONRectTransform : JSONTransform
    {
        public Vector2 anchoredPosition;
        public Vector2 anchorMax;
        public Vector2 anchorMin;
        public Vector2 offsetMax;
        public Vector2 offsetMin;
        public Vector2 pivot;
        public Vector2 sizeDelta;
    }

    public class JSONTimeOfDay : JSONComponent
    {
        public float timeOn;
        public float timeOff;
    }

    public class JSONCamera : JSONComponent
    {

    }

    public class JSONLight : JSONComponent
    {
        public Color color;
        public float range;
        public string lightType;
        public bool castsShadows;
        public bool realtime;
    }


    public class JSONBoxCollider : JSONComponent
    {
        public Vector3 center;
        public Vector3 size;
    }

    public class JSONMeshCollider : JSONComponent
    {
    }

    public class JSONRigidBody : JSONComponent
    {
        public float mass;
    }

    public class JSONMeshRenderer : JSONComponent
    {
        public string mesh;
        public bool enabled;
        public bool castShadows;
        public bool receiveShadows;
        public int lightmapIndex;
        public Vector4 lightmapTilingOffset;
        public string[] materials;
    }

    public class JSONSkinnedMeshRenderer : JSONComponent
    {
        public string mesh;
        public string rootBone;
        public bool enabled;
        public bool castShadows;
        public bool receiveShadows;
        public string[] materials;
    }

    public class JSONKeyframe
    {
        public float value;
        public string name;
        public float time;
        public bool onOff;
    }

    public class JSONAnimationNode
    {
        public string name;
        public JSONKeyframe[] keyframes;
    }


    public class JSONAnimationClip
    {
        public string name;
        public float length;
        public JSONAnimationNode[] nodes;
    }

    public class JSONAnimation : JSONComponent
    {
        public JSONAnimationClip[] clips;
    }


    public class JSONTerrain : JSONComponent
    {
        public int heightmapHeight;
        public int heightmapWidth;
        public int heightmapResolution;

        public Vector3 heightmapScale;
        public Vector3 size;

        public int alphamapWidth;
        public int alphamapHeight;
        public int alphamapLayers;

        public string base64Height;
        public int base64HeightLength;

        public string base64Alpha;
        public int base64AlphaLength;

    }

    public class JSONResources
    {
//        public List<JSONTexture> textures;
//        public List<JSONLightmap> lightmaps;
//        public List<JSONShader> shaders;
//        public List<JSONMaterial> materials;
//        public List<JSONMesh> meshes;
        public List<JSONSprite> sprites;
        public List<JSONParticle> particles;

        /*        public JSONMaterial GetMaterial(string name)
                {
                    foreach (var material in materials)
                        if (material.name == name)
                            return material;

                    return null;
                }

                public JSONMesh GetMesh(string name)
                {
                    foreach (var mesh in meshes)
                        if (mesh.name == name)
                            return mesh;

                    return null;
                }
         */
    }

    public class JSONScene
    {
        public string name;
        public JSONResources resources;
        public List<JSONGameObject> hierarchy;
    }
}
 