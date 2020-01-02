class Color
{
    constructor (r, g, b, a)
    {
        if (r != undefined && r != null)
            this.r = r;
        else
            this.r = 1;

        if (g != undefined && g != null)
            this.g = g;
        else
            this.g = 1;

        if (b != undefined && b != null)
            this.b = b;
        else 
            this.b = 1;

        if (a != undefined && a != null)
            this.a = a;
        else
            this.a = 1;
    }

    colorToTint ()
    {
        var c = ((this.r * 255) & 0xff) << 16;
        c += ((this.g * 255) & 0xff) << 8;
        c += ((this.b * 255) & 0xff);

        return c;
    }

    set rgba (color)
    {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }

    get rgba ()
    {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a,
        }
    }

    mul (color)
    {
        return {
            r: this.r * color.r,
            g: this.g * color.g,
            b: this.b * color.b,
            a: this.a * color.a
        }
    }

    clone ()
    {
        return new Color (this.r, this.g, this.b, this.a);
    }

    get Hex ()
    {
        //console.log (Helpers.instance.rgbToHex (Math.floor (this.r * 255), Math.floor (this.g * 255), Math.floor (this.b * 255)));
        return Helpers.instance.rgbToHex (Math.floor (this.r * 255), Math.floor (this.g * 255), Math.floor (this.b * 255));
    }
}