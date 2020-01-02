// Copyright (c) 2014-2015, THUNDERBEAST GAMES LLC
// Licensed under the MIT license, see LICENSE for details


using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEditor;

namespace JSONExporter
{

    public class JEKeyframe
    {
        public float value;
        public string name;
        public float time = 0.0f;
        public bool onOff = false;
    }

    public class JEAnimationClip
    {
        public string name;
        public float length;
        public Dictionary<string, List<JEKeyframe>> keyframes = new Dictionary<string, List<JEKeyframe>>();
    }

    public class JEAnimation : JEComponent
    {
        float time = 0;

        override public void Preprocess()
        {
            // m_LocalScale.x - z
            // m_LocalPosition.x - z
            // m_LocalRotation.x - w

            // for now copy the keys, we could evaluate and maybe should
            // as Unity keys have in/out tangents

            unityAnim = unityComponent as JSONAnimationHelper;

            // no way to get clips like this, going to need a custom component
            // for now, support one animation
            //for (int i = 0; i < unityAnim.GetClipCount(); i++)
            //{
            //	var clip = unityAnim.clips[i];
            //}

            if (unityAnim.AnimationClips != null)
            {
                for (int i = 0; i < unityAnim.AnimationClips.Length; i++)
                {
                    AddClip(unityAnim.AnimationClips[i]);
                }
            }
        }

        void AddClip(AnimationClip clip)
        {
            JEAnimationClip aclip = new JEAnimationClip();
            aclip.name = clip.name;
            aclip.length = clip.length;
            clips.Add(aclip);

            AnimationClipCurveData[] curveData = AnimationUtility.GetAllCurves(clip, true);

            //            EditorCurveBinding[] curveData2 = AnimationUtility.GetCurveBindings(clip);

            // object references
            foreach (var binding in AnimationUtility.GetObjectReferenceCurveBindings(clip))
            {
                ObjectReferenceKeyframe[] oKeyframes = AnimationUtility.GetObjectReferenceCurve(clip, binding);

                var boneName = binding.propertyName;

                if (binding.path != "")
                    boneName = binding.path + ":" + boneName;

                var keyframes = new List<JEKeyframe>();
                JEKeyframe keyframe;

                for (var a = 0; a < oKeyframes.Length; a++)
                {
                    keyframe = new JEKeyframe();
                    keyframe.time = oKeyframes[a].time;

                    if (oKeyframes[a].value is Sprite)
                    {
                        Sprite spr = (Sprite) oKeyframes[a].value;
                        keyframe.name = spr.name;
                    }

                    keyframes.Add(keyframe);
                }

                // fill with temp image for last frame
                keyframe = new JEKeyframe();
                keyframe.time = clip.length;
                if (oKeyframes[oKeyframes.Length - 1].value is Sprite)
                {
                    Sprite spr = (Sprite)oKeyframes[oKeyframes.Length - 1].value;
                    keyframe.name = spr.name;
                }
                keyframes.Add(keyframe);

                aclip.keyframes[boneName] = keyframes;
            }

            // curve data
            Dictionary<string, List<AnimationClipCurveData>> animdata = new Dictionary<string, List<AnimationClipCurveData>>();
            
            for (int i = 0; i < curveData.Length; i++)
            {
                AnimationClipCurveData cd = curveData[i];

                List<AnimationClipCurveData> nodedata;

                var name = cd.propertyName;

                if (cd.path != "")
                    name = cd.path + ":" + name;

                if (!animdata.TryGetValue(name, out nodedata))
                    nodedata = animdata[name] = new List<AnimationClipCurveData>();

                nodedata.Add(cd);
            }

            JEAnimationClip rclip = new JEAnimationClip();
            List<string> rotationNames = new List<string>();

            foreach (KeyValuePair<string, List<AnimationClipCurveData>> entry in animdata)
            {
                var boneName = entry.Key;
                bool valueChanged = false;

                var keyframes = new List<JEKeyframe>();

                bool isOnOff = boneName.IndexOf("m_Enabled") != -1;
                isOnOff = boneName.IndexOf("m_IsActive") != -1;

                foreach (AnimationClipCurveData cd in entry.Value)
                {
                    var curve = cd.curve;

                    if (curve.keys.Length == 0)
                        continue;

                    for (var a = 0; a < curve.keys.Length; a++)
                    {
                        JEKeyframe keyframe = new JEKeyframe();
                        keyframe.time = curve.keys[a].time;
                        keyframe.value = curve.keys[a].value;
                        //                        keyframe.inTangent = curve.keys[a].inTangent;
                        //                        keyframe.outTangent = curve.keys[a].outTangent;
                        //                        keyframe.tangentMode = curve.keys[a].tangentMode;

                        if (isOnOff)
                        {
                            keyframe.onOff = true;
                            valueChanged = true;
                        }

                        if (a > 0)
                        {
                            if (curve.keys[a].value != curve.keys[0].value)
                                valueChanged = true;
                        }
                        else
                        {
                            valueChanged = true;
                        }

                        keyframes.Add(keyframe);
                    }
                }

                if (boneName.IndexOf("m_LocalRotation") != -1)
                {
                    int indx = boneName.IndexOf("m_LocalRotation");
                    string name = boneName.Substring(0, indx) + "m_LocalRotation";

                    if (!rotationNames.Contains(name))
                        rotationNames.Add(name);
                    rclip.keyframes[boneName] = keyframes;
                }
                else if (boneName.IndexOf ("localEulerAnglesRaw") != -1)
                {
                    int pos = boneName.IndexOf("localEulerAnglesRaw");
                    boneName = boneName.Substring(0, pos) + "m_LocalRotation";
                    aclip.keyframes[boneName] = keyframes;
                }
                else if (valueChanged)
                {
                    aclip.keyframes[boneName] = keyframes;
                }
            }

            while (rotationNames.Count > 0)
            {
                string name = rotationNames[0];
                rotationNames.RemoveAt(0);

                List<JEKeyframe> x = rclip.keyframes[name + ".x"];
                List<JEKeyframe> y = rclip.keyframes[name + ".y"];
                List<JEKeyframe> z = rclip.keyframes[name + ".z"];
                List<JEKeyframe> w = rclip.keyframes[name + ".w"];

                rclip.keyframes.Remove(name + ".x");
                rclip.keyframes.Remove(name + ".y");
                rclip.keyframes.Remove(name + ".z");
                rclip.keyframes.Remove(name + ".w");
                
                for (var a = 0; a < x.Count; a++)
                {
                    Quaternion quat = new Quaternion(x[a].value, y[a].value, z[a].value, w[a].value);
                    x[a].value = quat.eulerAngles.z;
                }

                aclip.keyframes[name] = x;
            }
        }

        new public static void Reset()
        {

        }

        public override JSONComponent ToJSON()
        {
            var json = new JSONAnimation();
            json.type = "Animation";
            json.clips = new JSONAnimationClip[clips.Count];

            for (int i = 0; i < clips.Count; i++)
            {
                JEAnimationClip clip = clips[i];

                var jclip = json.clips[i] = new JSONAnimationClip();

                jclip.name = clip.name;
                jclip.length = clip.length;

                JSONAnimationNode[] jnodes = jclip.nodes = new JSONAnimationNode[clip.keyframes.Count];

                int count = 0;
                foreach (KeyValuePair<string, List<JEKeyframe>> entry in clip.keyframes)
                {
                    JSONAnimationNode node = new JSONAnimationNode();
                    node.name = entry.Key;
                    node.keyframes = new JSONKeyframe[entry.Value.Count];

                    int kcount = 0;
                    foreach (var key in entry.Value)
                    {
                        var jkeyframe = new JSONKeyframe();

                        if (string.IsNullOrEmpty (key.name))
                            jkeyframe.value = key.value;
                        else
                            jkeyframe.name = key.name;

                        jkeyframe.time = key.time;

                        if (node.name == "m_IsActive")
                            jkeyframe.onOff = true;
                        else
                            jkeyframe.onOff = key.onOff;

                        node.keyframes[kcount++] = jkeyframe;
                    }

                    jnodes[count++] = node;

                }

            }

            return json;
        }

        JSONAnimationHelper unityAnim;
        List<JEAnimationClip> clips = new List<JEAnimationClip>();

    }

}