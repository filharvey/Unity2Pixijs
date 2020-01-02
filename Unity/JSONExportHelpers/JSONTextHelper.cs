using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class JSONTextHelper : MonoBehaviour
{
    public Text text;

    public string fontName;

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

    JSONTextHelper()
    {
        stroke = Color.black;

        fontWeight = "normal";

        fontName = "Arial";

        strokeThickness = 0;

        leading = 0;

        letterSpacing = 0;

        lineHeight = 0;

        padding = 0;

        dropShadow = false;

        dropShadowAlpha = 1;

        dropShadowAngle = 135;

        dropShadowBlur = 0;

        dropShadowColor = Color.black;

        dropShadowDistance = 5;
    }
}
