using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AnimatedImage : MonoBehaviour
{
    public Image image;

    public float frameRate;

    public bool loop = true;

    public List<Sprite> frames;
}
