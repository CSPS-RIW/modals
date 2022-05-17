# DragonDrop_BS

A version of the DragonDrop plugin for Snap! to be used in Brightspace (code extracted from Snap! with Require.js stripped out) (Thanks Benoit Lord)

* The DragonDrop folder contains the code extracted from Snap!.
* The lib folder contains libraries that are used in the test page (see below).
* The style folder contains the SCSS from the original plugin.

## HTML 1️⃣

Copy the template markup from here and paste it in your HTML file. It should work if you are using [default html tempaltes](https://dev.azure.com/CSPS-EFPC-CourseDev/Courses/_git/RIW_BS_Template2021?version=GBdev&anchor=intro-1%EF%B8%8F%E2%83%A3).

```apache
<!-- DragonDrop -->
        <section class="LOM-element" id="LOM_el_3" data-lom-element="custom">
            <!-- Drag Area begins -->
            <section class="row snap-drag-area" data-drag-settings="{'dropType':'return', 'labelType': 'textElBefore'}">
                <div class="col-xs-12 col-md-3">
                    <div class="LOM-editable" id="LOM-edit-3">
                        <h2 style="margin-bottom: 30px;">Draggable Objects</h2>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="1">
                            <div class="LOM-editable" id="LOM-edit-8">
                                <p>Word 1</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="2">
                            <div class="LOM-editable" id="LOM-edit-7">
                                <p>Word 2</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="3">
                            <div class="LOM-editable" id="LOM-edit-5">
                                <p>Word 3</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="4">
                            <div class="LOM-editable" id="LOM-edit-4">
                                <p>Word 4</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="5">
                            <div class="LOM-editable" id="LOM-edit-9">
                                <p>Word 5</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="snap-drag" data-value="6">
                            <div class="LOM-editable" id="LOM-edit-6">
                                <p>Word 6</p>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <!-- Drop Area begins -->
                <div class="col-xs-12 col-md-9 drop-area">
                    <div class="LOM-editable" id="LOM-edit-10">
                        <h2>Questions</h2>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-11">
                        <p><strong>1. A large deer with long horns with branches that lives in North America</strong>
                        </p>
                    </div>
                    <div class="snap-drop" data-answer="4"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-12">
                                <p>The Indigenous word associated to this question is <strong>caribou</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-13">
                        <p><strong>2. A warm, dry wind that blows from the mountains over the flatter land to the east
                                in
                                western North America</strong></p>
                    </div>
                    <div class="snap-drop" data-answer="3"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-14">
                                <p>The Indigenous word associated to this question is <strong>chinook</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-15">
                        <p><strong>3. A light narrow canoe with a covering over the top</strong></p>
                    </div>
                    <div class="snap-drop" data-answer="6"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-16">
                                <p>The Indigenous word associated to this question is <strong>kayak</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-17">
                        <p><strong>4. A North American swamp or bog consisting of a mixture of water and partly dead
                                vegetation, frequently covered by a layer of sphagnum or other mosses </strong></p>
                    </div>
                    <div class="snap-drop" data-answer="2"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-18">
                                <p>The Indigenous word associated to this question is <strong>muskeg</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-19">
                        <p><strong>5. A small, black and white North American animal that makes a strong, unpleasant
                                smell
                                as a defence when it is attacked </strong></p>
                    </div>
                    <div class="snap-drop" data-answer="1"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-20">
                                <p>The Indigenous word associated to this question is <strong>skunk</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div class="LOM-editable" id="LOM-edit-21">
                        <p><strong>6. An object for sitting on and sliding over snow and ice consisting of a low frame
                                that
                                curves up at the front </strong></p>
                    </div>
                    <div class="snap-drop" data-answer="5"> </div>
                    <div class="snap-validation">
                        <div class="snap-validation-generic">
                            <div class="LOM-editable" id="LOM-edit-22">
                                <p>The Indigenous word associated to this question is <strong>toboggan</strong>.</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn-submit-dragondrop btn btn-primary">Submit</button>
                </div>
            </section>
        </section>

```

Once you paste it, you can modify the content. Make sure that you keep all the LOM/Snap classes and attributes for the plugin to work.

## JS

You need to initialize a new instance of the dragManager. To do that, you need to go to `~/js/plugins.js` and uncomment:

```apache
  window.dragManager = new DragManager();
    window.dragManager.initialize();
```

## CSS

The current style.css file in `~/js/plugins/dragondrop/style` has a basic layer of styles. Feel free to *PR* better styles. For now, add your styles in `~/scss/custom/theme/plugins/dragondrop/_dragondrop.scss`
