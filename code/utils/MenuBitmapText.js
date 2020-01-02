class MenuBitmapText extends PIXI.extras.BitmapText
{   
    constructor (text, style)
    {
        super (text, style);

        this.minFontSize = -1;
        this.maxFontSize = -1;

        this.resizeTextForBestFit = false;
    }

    updateText ()
    {
        if (this.resizeTextForBestFit)
        {
            var data = PIXI.extras.BitmapText.fonts[this._font.name];
            var pos = new PIXI.Point();
            var width = 0;
            this._font.size = this.maxFontSize;
            var overFlow = false;
            
            do
            {
                var scale = this._font.size / data.size;
                
                var prevCharCode = null;
                var lastSpace = -1;
                var spacesRemoved = 0;
                overFlow = false;
        
                for (var i = 0; i < this.text.length && overFlow == false; i++) {
                    var charCode = this.text.charCodeAt(i);
        
                    if (/(\s)/.test(this.text.charAt(i))) {
                        lastSpace = i;
                    }
        
                    if (lastSpace !== -1 && this._maxWidth > 0 && pos.x * scale > this._maxWidth) {
                        i = lastSpace;
                        lastSpace = -1;
        
                        this._font.size -= 1;

                        if (this._font.size < this._minFontSize)
                        {
                            this._font.size = this._minFontSize;
                        }
        
                        pos.x = 0;
                        prevCharCode = null;
                        overFlow = true;
                        continue;
                    }
        
                    var charData = data.chars[charCode];
        
                    if (!charData) {
                        continue;
                    }
        
                    if (prevCharCode && charData.kerning[prevCharCode]) {
                        pos.x += charData.kerning[prevCharCode];
                    }
    
                    pos.x += charData.xAdvance;
                    prevCharCode = charCode;
                }            
            }
            while (this._font.size > this._minFontSize && overFlow == true);
        }

        super.updateText ();        
    }


}