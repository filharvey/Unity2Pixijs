// https://github.com/infusion/Quaternion.js

class UnityAnimation
{
    constructor (json)
    {
        this.clips = {};
        this.baseAnim = "";
                
        if (json)
            this.processJson (json)
    }

    processJson (json)
    {
        if (json.clips)
        {
            for (var c in json.clips)
            {
                var jsonClip = json.clips[c];

                var clip = {
                    name: jsonClip.name,
                    length: jsonClip.length,
                    nodes: [],
                    menuObjects: {}
                };

                if (this.baseAnim == "")
                    this.baseAnim = jsonClip.name;
                
                for (var n in jsonClip.nodes)
                {
                    var jsonNode = jsonClip.nodes[n];

                    var node = {
                        name: "",
                        key: jsonNode.name,
                        property: "",
                        keyframes: [
                        ],

                        // working data
                        lastTime: 0,
                        lastFrame: 0
                    };

                    if (jsonNode.name.indexOf (':') != -1)
                    {
                        var sname = jsonNode.name.split (":");

                        node.name = sname[0];
                        node.key = sname[1];
                    }

                    if (node.key.indexOf ('.') != -1)
                    {
                        var skey = node.key.split (".");

                        node.key = skey[0];
                        node.property = skey[1];
                    }

                    // force a first frame
                    if (jsonNode.keyframes[0].time != 0)
                    {
                        var jsonKeyFrame = jsonNode.keyframes[0];
                        var name = "";
                        var onOff = false;
                        var value = 0;

                        if (jsonKeyFrame.hasOwnProperty ("name"))
                            name = jsonKeyFrame.name; 
                        if (jsonKeyFrame.hasOwnProperty ("onOff"))
                            onOff = jsonKeyFrame.onOff; 
                        if (jsonKeyFrame.hasOwnProperty ("value"))
                            value = jsonKeyFrame.value; 
                        
                        node.keyframes.push ({
                            value: value,
                            name: name,
                            onOff: onOff,
                            time: 0
                        });
                    }

                    for (var k in jsonNode.keyframes)
                    {
                        var jsonKeyFrame = jsonNode.keyframes[k];
                        var name = "";
                        var onOff = false;
                        var value = 0;

                        if (jsonKeyFrame.hasOwnProperty ("name"))
                            name = jsonKeyFrame.name; 
                        if (jsonKeyFrame.hasOwnProperty ("onOff"))
                            onOff = jsonKeyFrame.onOff; 
                        if (jsonKeyFrame.hasOwnProperty ("value"))
                            value = jsonKeyFrame.value; 

                        node.keyframes.push ({
                            value: value,
                            name: name,
                            onOff: onOff,
                            time: jsonKeyFrame.time
                        });
                    }

                    // force a last frame
                    if (jsonNode.keyframes[jsonNode.keyframes.length - 1].time != clip.length)
                    {
                        var jsonKeyFrame = jsonNode.keyframes[jsonNode.keyframes.length - 1];
                        
                        node.keyframes.push ({
                            value: jsonKeyFrame.value,
                            name: jsonKeyFrame.name,
                            onOff: jsonKeyFrame.onOff,
                            time: clip.length
                        });
                    }

                    clip.nodes.push (node);
                }
                
                this.clips[clip.name] = clip;
            }
        }
    }
}