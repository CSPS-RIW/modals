# Magnific Popup plugin (lightbox/modal)

These instructions will get you set up to use the plugin with the [default html templates](https://dev.azure.com/CSPS-EFPC-CourseDev/Courses/_git/RIW_BS_Template2021?version=GBdev&anchor=intro-1%EF%B8%8F%E2%83%A3). If you want to read more about how the plugin works, read the [documentation](https://dimsemenov.com/plugins/magnific-popup/documentation.html).

## Html 1️⃣

There are two parts to make this plugin work.

1. Trigger
2. Modal content

### For the trigger

You need to bind the plugin to an html element, in this case we'll use an anchor tag.

You can copy-paste any of the following triggers depending on your course.

Wrap the anchor tag around text:

#### English

```apache
<!-- Text Trigger -->  
<a href="#" class="case-lbx-link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Open modal"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);"> Click me to show the hidden content.</a>
```

Or wrap the anchor tag around an image:

```apache
<!-- Image trigger -->
<a href="#" class="case-lbx-link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Open modal"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);"><img
                src="https://farm4.staticflickr.com/3721/9207329484_ba28755ec4_o.jpg" alt="Wild animals"></a>

```

Use buttons:

```apache
<!-- Button Trigger -->
        <button href="#" class="case-lbx-link btn btn-secondary" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="Open modal"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);">
            Click me to show the hidden content.</button>
```

#### Français

```apache
<!-- Text Trigger -->  
<a href="#" class="case-lbx-link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ouvre la
fenêtre contextuelle"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);"> Cliquez ici pour afficher le contenu caché.</a>

```

Avec une image :

```apache
<!-- Image trigger -->
<a href="#" class="case-lbx-link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ouvre la
fenêtre contextuelle"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);"><img
                src="https://farm4.staticflickr.com/3721/9207329484_ba28755ec4_o.jpg" alt="Wild animals"></a>

```

Utiliser des boutons :

```apache
<!-- Button Trigger -->
        <button href="#" class="case-lbx-link btn btn-secondary" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="Ouvre la
            fenêtre contextuelle"
            onclick="$.magnificPopup.open({ items: { src: '#BS_el_1_lbx' }, type: 'inline', removalDelay: 500, callbacks: { beforeOpen: function() { this.st.mainClass = 'mfp-zoom-in'; } }, midClick: true }, 0);">
            Cliquez ici pour afficher le contenu caché.</button> 
  
```

The `onclick` event listener selects the id that will be revealed. In this case, magnific-popup is targeting `src: '#BS_el_1_lbx`.

This means that, as long as you change the id, you can have multiple modals per page.

### For the content

I took the modal template from LOM but you can just copy this html into your page.

#### English

```apache
<!-- Magnific Popup content -->
        <section class="mfp-hide modal-dialog modal-content overlay-def mfp-with-anim" id="BS_el_1_lbx">
            <header class="modal-header">
                <h2 class="modal-title">
                    Title of modal
                </h2>
                <button title="Close overlay (escape key)" type="button" class="mfp-close overlay-close">×<span
                        class="wb-inv"> Close overlay (escape
                        key)</span></button>
            </header>
            <div class="modal-body" id="BS_el_8_holder">
                <section class="BS-modal-element" id="BS_el_9">
                    <!-- This element is a plain Text area -->
                    <div>
                        <p>Body text</p>
                    </div>
                </section>
            </div>
            <div class="modal-footer"><button type="button" id="ftrClose"
                    class="btn btn-sm btn-secondary pull-left popup-modal-dismiss mfp-close footer-exit"
                    title="Close overlay (escape key)">Close<span class="wb-inv">Close overlay
                        (escape
                        key)</span></button></div>
        </section>

```

#### Français

```apache
        <!-- Magnific Popup content -->
        <section class="mfp-hide modal-dialog modal-content overlay-def mfp-with-anim" id="BS_el_1_lbx">
            <header class="modal-header">
                <h2 class="modal-title">
                    Titre
                </h2>
                <button title="Fermer : Portable (touche d'échappement)" type="button"
                    class="mfp-close overlay-close">×<span class="wb-inv"> Fermer : Portable (touche
                        d'échappement)</span></button>
            </header>
            <div class="modal-body" id="BS_el_8_holder">
                <section class="BS-modal-element" id="BS_el_9">
                    <!-- This element is a plain Text area -->
                    <div>
                        <p>Insérez votre contenu ici...</p>
                    </div>
                </section>
            </div>
            <div class="modal-footer"><button type="button" id="ftrClose"
                    class="btn btn-sm btn-secondary pull-left popup-modal-dismiss mfp-close footer-exit"
                    title="Fermer : Portable (touche d'échappement)">Fermer<span class="wb-inv">Fermer : Portable
                        (touche
                        d'échappement)</span></button></div>
        </section>
```

## CSS 2️⃣

Magnific popup has a css file in `~/js/plugins/magnific-popup/magnific-popup.css`, I wouldn't reccommend to edit it. It has all the styles for the backdrop and more fancy things. So don't touch it.

If you want to overwrite styles go to `~/scss/custom/theme/plugins/magnific-popup/magnific-popup.scss`. I have added some styles to make the modal responsive and compatible with BS.

## Js 3️⃣

The JavaScript tag is already preadded in the template so if you use the [default html templates](https://dev.azure.com/CSPS-EFPC-CourseDev/Courses/_git/RIW_BS_Template2021?version=GBdev&anchor=intro-1%EF%B8%8F%E2%83%A3) and you paste the trigger and content markup, you will be ready to rock!
