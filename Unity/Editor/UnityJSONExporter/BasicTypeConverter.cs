using JSONExporter;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Assets.Editor.UnityJSONExporter
{
    public class BasicTypeConverter : JsonConverter
    {
        Color blankColor = new Color(0, 0, 0, 0);

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value != null)
            {
                if (value.GetType() == typeof(Color))
                {
                    Color color = (Color)value;
                    writer.WriteStartObject();
                    writer.WritePropertyName("r");
                    writer.WriteValue(Math.Floor (color.r * 1000) / 1000);
                    writer.WritePropertyName("g");
                    writer.WriteValue(Math.Floor(color.g * 1000) / 1000);
                    writer.WritePropertyName("b");
                    writer.WriteValue(Math.Floor(color.b * 1000) / 1000);
                    writer.WritePropertyName("a");
                    writer.WriteValue(Math.Floor(color.a * 1000) / 1000);
                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(Vector2))
                {
                    Vector2 v = (Vector2)value;
                    writer.WriteStartObject();
                    writer.WritePropertyName("x");
                    writer.WriteValue(v.x);
                    writer.WritePropertyName("y");
                    writer.WriteValue(v.y);
                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(Vector3))
                {
                    Vector3 v = (Vector3)value;
                    writer.WriteStartObject();
                    writer.WritePropertyName("x");
                    writer.WriteValue(v.x);
                    writer.WritePropertyName("y");
                    writer.WriteValue(v.y);
                    writer.WritePropertyName("z");
                    writer.WriteValue(v.z);
                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(Vector4))
                {
                    Vector4 v = (Vector4)value;
                    writer.WriteStartObject();
                    writer.WritePropertyName("x");
                    writer.WriteValue(v.x);
                    writer.WritePropertyName("y");
                    writer.WriteValue(v.y);
                    writer.WritePropertyName("z");
                    writer.WriteValue(v.z);
                    writer.WritePropertyName("w");
                    writer.WriteValue(v.w);
                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(Quaternion))
                {
                    Quaternion q = (Quaternion)value;
                    writer.WriteStartObject();
                    writer.WritePropertyName("x");
                    writer.WriteValue(q.x);
                    writer.WritePropertyName("y");
                    writer.WriteValue(q.y);
                    writer.WritePropertyName("z");
                    writer.WriteValue(q.z);
                    writer.WritePropertyName("w");
                    writer.WriteValue(q.w);
                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(Matrix4x4))
                {
                    Matrix4x4 m = (Matrix4x4)value;
                    writer.WriteStartArray();

                    for (int y = 0; y < 4; y++)
                        for (int x = 0; x < 4; x++)
                            writer.WriteValue(m[y, x]);

                    writer.WriteEndArray();
                }
                else if (value.GetType() == typeof(JSONKeyframe))
                {
                    JSONKeyframe kf = (JSONKeyframe)value;
                    writer.WriteStartObject();

                    writer.WritePropertyName("time");
                    writer.WriteValue(kf.time);

                    writer.WritePropertyName("value");
                    writer.WriteValue(kf.value);

                    if (!string.IsNullOrEmpty(kf.name))
                    {
                        writer.WritePropertyName("name");
                        writer.WriteValue(kf.name);
                    }

                    writer.WritePropertyName("onOff");
                    writer.WriteValue(kf.onOff);

                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(JSONTransform))
                {
                    JSONTransform t = (JSONTransform)value;
                    writer.WriteStartObject();

                    writeJSONTransform(writer, t, serializer);

                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(JSONRectTransform))
                {
                    JSONRectTransform t = (JSONRectTransform)value;
                    writer.WriteStartObject();

                    writeJSONTransform(writer, t, serializer);

                    if (!t.anchoredPosition.Equals(Vector2.zero))
                    {
                        writer.WritePropertyName("anchoredPosition");
                        serializer.Serialize(writer, t.anchoredPosition);
                    }

                    if (!t.anchorMax.Equals(new Vector2 (0.5f, 0.5f)))
                    {
                        writer.WritePropertyName("anchorMax");
                        serializer.Serialize(writer, t.anchorMax);
                    }

                    if (!t.anchorMin.Equals(new Vector2(0.5f, 0.5f)))
                    {
                        writer.WritePropertyName("anchorMin");
                        serializer.Serialize(writer, t.anchorMin);
                    }

/*                    if (!t.offsetMax.Equals(Vector2.zero))
                    {
                        writer.WritePropertyName("offsetMax");
                        serializer.Serialize(writer, t.offsetMax);
                    }

                    if (!t.offsetMin.Equals(Vector2.zero))
                    {
                        writer.WritePropertyName("offsetMin");
                        serializer.Serialize(writer, t.offsetMin);
                    }
*/
                    if (!t.pivot.Equals(new Vector2(0.5f, 0.5f)))
                    {
                        writer.WritePropertyName("pivot");
                        serializer.Serialize(writer, t.pivot);
                    }

                    if (!t.sizeDelta.Equals(Vector2.zero))
                    {
                        writer.WritePropertyName("sizeDelta");
                        serializer.Serialize(writer, t.sizeDelta);
                    }

                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(JSONImage))
                {
                    JSONImage b = (JSONImage)value;
                    writer.WriteStartObject();

                    writeJSONComponent(writer, b, serializer);
                    writeJSONGraphic(writer, b, serializer);

                    if (!string.IsNullOrEmpty (b.spriteName))
                    {
                        writer.WritePropertyName("spriteName");
                        writer.WriteValue(b.spriteName);
                    }

                    if (b.minHeight != 0)
                    {
                        writer.WritePropertyName("minHeight");
                        writer.WriteValue(b.minHeight);
                    }

                    if (b.minWidth != 0)
                    {
                        writer.WritePropertyName("minWidth");
                        writer.WriteValue(b.minWidth);
                    }

                    if (b.preferredHeight != 0)
                    {
                        writer.WritePropertyName("preferredHeight");
                        writer.WriteValue(b.preferredHeight);
                    }

                    if (b.preferredWidth != 0)
                    {
                        writer.WritePropertyName("preferredWidth");
                        writer.WriteValue(b.preferredWidth);
                    }

                    if (!b.preserveAspect)
                    {
                        writer.WritePropertyName("preserveAspect");
                        writer.WriteValue(b.preserveAspect);
                    }

                    if (b.fillType != 0)
                    {
                        writer.WritePropertyName("fillType");
                        writer.WriteValue(b.fillType);

                        if (b.fillType == 1)
                        {
                            if (!b.border.Equals (Vector4.zero))
                            {
                                writer.WritePropertyName("border");
                                serializer.Serialize(writer, b.border);
                            }
                        }
                        else if (b.fillType == 3)
                        {
                            writer.WritePropertyName("fillOrigin");
                            writer.WriteValue(b.fillOrigin);

                            writer.WritePropertyName("fillAmount");
                            writer.WriteValue(b.fillAmount);

                            writer.WritePropertyName("fillMethod");
                            writer.WriteValue(b.fillMethod);
                        }
                    }

                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(JSONButton))
                {
                    JSONButton b = (JSONButton)value;
                    writer.WriteStartObject();

                    writeJSONComponent(writer, b, serializer);

                    if (b.interactable)
                    {
                        writer.WritePropertyName("interactable");
                        writer.WriteValue(b.interactable);
                    }

                    if (b.transition != 0)
                    {
                        writer.WritePropertyName("transition");
                        writer.WriteValue(b.transition);
                    }

                    if (!b.normalColor.Equals(blankColor))
                    {
                        writer.WritePropertyName("normalColor");
                        serializer.Serialize(writer, b.normalColor);
                    }

                    if (!b.disabledColor.Equals(blankColor))
                    {
                        writer.WritePropertyName("disabledColor");
                        serializer.Serialize(writer, b.disabledColor);
                    }

                    if (!b.pressedColor.Equals(blankColor))
                    {
                        writer.WritePropertyName("pressedColor");
                        serializer.Serialize(writer, b.pressedColor);
                    }

                    if (!b.highlightedColor.Equals(blankColor))
                    {
                        writer.WritePropertyName("highlightedColor");
                        serializer.Serialize(writer, b.highlightedColor);
                    }

                    if (b.colorMultiplier != 1)
                    {
                        writer.WritePropertyName("colorMultiplier");
                        writer.WriteValue(b.colorMultiplier);
                    }

                    if (!string.IsNullOrEmpty(b.disabledSprite))
                    {
                        writer.WritePropertyName("disabledSprite");
                        writer.WriteValue(b.disabledSprite);
                    }

                    if (!string.IsNullOrEmpty(b.pressedSprite))
                    {
                        writer.WritePropertyName("pressedSprite");
                        writer.WriteValue(b.pressedSprite);
                    }

                    if (!string.IsNullOrEmpty(b.highlightedSprite))
                    {
                        writer.WritePropertyName("highlightedSprite");
                        writer.WriteValue(b.highlightedSprite);
                    }

                    writer.WriteEndObject();
                }
                else if (value.GetType() == typeof(JSONText))
                {
                    JSONText t = (JSONText)value;
                    writer.WriteStartObject();

                    writeJSONComponent(writer, t, serializer);
                    writeJSONGraphic(writer, t, serializer);

                    writer.WritePropertyName("text");
                    writer.WriteValue(t.text);

                    writer.WritePropertyName("fontName");
                    writer.WriteValue(t.fontName);

                    writer.WritePropertyName("fontSize");
                    writer.WriteValue(t.fontSize);

                    writer.WritePropertyName("alignment");
                    writer.WriteValue(t.alignment);

                    if (t.hOverflow != 0)
                    {
                        writer.WritePropertyName("hOverflow");
                        writer.WriteValue(t.hOverflow);
                    }

                    if (t.vOverflow != 0)
                    {
                        writer.WritePropertyName("vOverflow");
                        writer.WriteValue(t.vOverflow);
                    }

                    if (t.resizeTextForBestFit)
                    {
                        writer.WritePropertyName("resizeTextForBestFit");
                        writer.WriteValue(t.resizeTextForBestFit);

                        if (t.resizeTextMaxSize != 0)
                        {
                            writer.WritePropertyName("resizeTextMaxSize");
                            writer.WriteValue(t.resizeTextMaxSize);
                        }

                        if (t.resizeTextMinSize != 0)
                        {
                            writer.WritePropertyName("resizeTextMinSize");
                            writer.WriteValue(t.resizeTextMinSize);
                        }
                    }

                    if (t.lineSpacing != 0)
                    {
                        writer.WritePropertyName("lineSpacing");
                        writer.WriteValue(t.lineSpacing);
                    }

                    if (t.ignoreBitmapFont)
                    {
                        writer.WritePropertyName("ignoreBitmapFont");
                        writer.WriteValue(t.ignoreBitmapFont);

                        if (t.fontWeight.ToLower() != "normal")
                        {
                            writer.WritePropertyName("fontWeight");
                            writer.WriteValue(t.fontWeight.ToLower());
                        }

                        if (t.strokeThickness != 0)
                        {
                            writer.WritePropertyName("strokeThickness");
                            writer.WriteValue(t.strokeThickness);

                            if (!t.stroke.Equals(Color.black))
                            {
                                writer.WritePropertyName("stroke");
                                serializer.Serialize(writer, t.stroke);
                            }
                        }

                        if (t.leading != 0)
                        {
                            writer.WritePropertyName("leading");
                            writer.WriteValue(t.leading);
                        }

                        if (t.letterSpacing != 0)
                        {
                            writer.WritePropertyName("letterSpacing");
                            writer.WriteValue(t.letterSpacing);
                        }

                        if (t.lineHeight != 0)
                        {
                            writer.WritePropertyName("lineHeight");
                            writer.WriteValue(t.lineHeight);
                        }

                        if (t.padding != 0)
                        {
                            writer.WritePropertyName("padding");
                            writer.WriteValue(t.padding);
                        }

                        if (t.dropShadow)
                        {
                            writer.WritePropertyName("dropShadow");
                            writer.WriteValue(t.dropShadow);

                            writer.WritePropertyName("dropShadowAngle");
                            writer.WriteValue(t.dropShadowAngle);

                            writer.WritePropertyName("dropShadowDistance");
                            writer.WriteValue(t.dropShadowDistance);

                            if (t.dropShadowAlpha != 1)
                            {
                                writer.WritePropertyName("dropShadowAlpha");
                                writer.WriteValue(t.dropShadowAlpha);
                            }

                            if (t.dropShadowBlur != 0)
                            {
                                writer.WritePropertyName("dropShadowBlur");
                                writer.WriteValue(t.dropShadowBlur);
                            }

                            if (!t.dropShadowColor.Equals(Color.black))
                            {
                                writer.WritePropertyName("dropShadowColor");
                                serializer.Serialize(writer, t.dropShadowColor);
                            }
                        }
                    }

                    writer.WriteEndObject();
                }
            }
        }

        public void writeJSONTransform(JsonWriter writer, JSONTransform t, JsonSerializer serializer)
        {
            writer.WritePropertyName("type");
            writer.WriteValue(t.type);

            if (!string.IsNullOrEmpty(t.name))
            {
                writer.WritePropertyName("name");
                writer.WriteValue(t.name);
            }
            if (!string.IsNullOrEmpty(t.parentName))
            {
                writer.WritePropertyName("parentName");
                writer.WriteValue(t.parentName);
            }

            if (!t.localPosition.Equals(Vector3.zero))
            {
                writer.WritePropertyName("localPosition");
                serializer.Serialize(writer, t.localPosition);
            }

            if (t.localRotation != 0)
            {
                writer.WritePropertyName("localRotation");
                writer.WriteValue(t.localRotation);
            }

            if (!t.localScale.Equals(Vector3.one))
            {
                writer.WritePropertyName("localScale");
                serializer.Serialize(writer, t.localScale);
            }
        }

        public void writeJSONComponent(JsonWriter writer, JSONComponent value, JsonSerializer serializer)
        {
            writer.WritePropertyName("type");
            writer.WriteValue(value.type);
        }

        public void writeJSONGraphic (JsonWriter writer, JSONGraphic value, JsonSerializer serializer)
        {
            if (!value.color.Equals(Color.white))
            {
                writer.WritePropertyName("color");
                serializer.Serialize(writer, value.color);
            }

            if (value.raycastTarget)
            {
                writer.WritePropertyName("raycastTarget");
                writer.WriteValue(value.raycastTarget);
            }

            if (!value.enabled)
            {
                writer.WritePropertyName("enabled");
                writer.WriteValue(value.enabled);
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return null;
        }

        public override bool CanRead
        {
            get { return true; }
        }

        public override bool CanConvert(Type objectType)
        {
            Type[] types = new Type[] {
                typeof (JSONText),
                typeof (JSONImage),
                typeof (JSONButton),
                typeof (JSONRectTransform),
                typeof (JSONTransform),
                typeof (JSONKeyframe),
                typeof(Color),
                typeof(Vector2),
                typeof(Vector3),
                typeof(Vector4),
                typeof(Quaternion),
                typeof(Matrix4x4)
            };

            return Array.IndexOf(types, objectType) != -1;
        }
    }
}
