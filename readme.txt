This is based of an old repo cloned from

https://github.com/RobertoMalatesta/UnityToJSON

UNITY SIDE
==========

And converted to export Unity Canvas into JSON. to be used inside of Javascript based Projects. Initially was used to export to PlayCanvas, but then updated to import to Pixijs.

To export in unity to copy the Unity directory to your assets directory. This will then show a prompt on the main menu for UnityToJson. From there you can export the JSON for your scene, and import into Pixijs.

Note, for animations, fonts you need to add JSON Export helpers for them to export properly.


PIXI Side
=========

Make sure that file is loaded

    AssetLoader.instance.add ('assets/menus/unityexport.json');


Quick and simple way to use Menu.

    var json = PIXI.Loader.shared.resources["assets/menus/unityexport.json"].data;

    this.menu = new Menu (json);
    this.name = "MainMenu";
    this.addChild (this.menu);

    this.object = this.menu.getChild ('object/name');   // return pixi object

for buttons

    this.btn = this.menu.getChild ('object/button');
    this.btn.onPointerUp = this.onAnswer.bind (this);

There is also onPointerDown, onPointerMove functions.

You can change any image with

    this.image.spriteName = 'assets/newimage';

Animations can be exported as well, Will add an example later.
