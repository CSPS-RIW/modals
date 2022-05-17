# RevealMore plugin

This is a modified version of the "Clcik and Reveal" component from the BS templates. It has a text input, validates the text form and only shows the hidden content once something has been typed.

You will be able to modify the input and validation method to meet the course's needs.

(Feel free to pr changes to the plugin).

## JS 1️⃣

The RevealMore plugin is a jquery pluging therefore you need to bind it to a specific class/id/attribute in order for it to run. In this case the `class="revealMore">`.

If you go to plugins.js you will find a comment with the following line code: `// $('.revealMore').revealMore();`.

Just uncomment it and the plugin should work (as long as your markup is correct).

The line of code...

* selects the section with the class of `'revealMore'` and binds the plugin `'.revealMore()'`to it.

## HTML 2️⃣

Index_en.html and index_fr.html should already include links to the css and js links.

```apache
<!-- RevealMore core CSS file -->
    <link rel="stylesheet" href="../js/plugins/reveal-more/reveal-more.css">
 
```

```apache
 <!-- RevealMore plugin -->
    <script src="../js/plugins/reveal-more/jquery.reveal-more.js"></script>
  
```

If you created your page based on the [default html tempaltes](https://dev.azure.com/CSPS-EFPC-CourseDev/Courses/_git/RIW_BS_Template2021?version=GBdev&anchor=intro-1%EF%B8%8F%E2%83%A3), simply copy and paste the component:

### English

One component in page:

```apache
        <section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>Johnny's mother has three children. The first child is named April. The second child is named
                        May. What is the third child's name?</p>
                    <label for="q1"><strong>Write your response here:</strong></label>
                    <input type="text" name="q1" id="q1">

                    <button id="rvm1" class="btn btn-primary custom-btn-reveal btn-reveal reveal_1" type="submit"
                        data-reveal-more="reveal_1">Possible
                        Answer</button>
                    <div class="custom-collapse reveal_1" data-revealme="reveal_1" aria-labelledby="rvm1">
                        <p>Content to Reveal</p>
                    </div>
                </div>
            </div>
        </section>
```

Two components in page:

```apache
        <section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>Johnny's mother has three children. The first child is named April. The second child is named
                        May. What is the third child's name?</p>
                    <label for="q1"><strong>Write your response here:</strong></label>
                    <input type="text" name="q1" id="q1">

                    <button id="rvm1" class="btn btn-primary custom-btn-reveal btn-reveal reveal_1" type="submit"
                        data-reveal-more="reveal_1">Possible
                        Answer</button>
                    <div class="custom-collapse reveal_1" data-revealme="reveal_1" aria-labelledby="rvm1">
                        <p>Content to Reveal</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>Before Mt. Everest was discovered, what was the highest mountain in the world?</p>
                    <label for="q2"><strong>Write your response here:</strong></label>
                    <input type="text" name="q2" id="q2">

                    <button id="rvm2" class="btn btn-primary custom-btn-reveal btn-reveal reveal_2" type="submit"
                        data-reveal-more="reveal_2">Possible
                        Answer</button>
                    <div class="custom-collapse reveal_2" data-revealme="reveal_2" aria-labelledby="rvm2">
                        <p>Content to Reveal</p>
                    </div>
                </div>
            </div>
        </section>
```

### French

Un composant dans la page

```apache
        <section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>La mère de Jonathan a trois enfants. Le premier s’appelle Janvier. Le deuxième s’appelle Février.
                        Comment s’appelle le troisième?</p>
                    <label for="q1"><strong>Écrivez votre réponse ici:</strong></label>
                    <input type="text" name="q1" id="q1">

                    <button id="rvm1" class="btn btn-primary custom-btn-reveal btn-reveal reveal_1" type="submit"
                        data-reveal-more="reveal_1">Afficher la réponse</button>
                    <div class="custom-collapse reveal_1" data-revealme="reveal_1" aria-labelledby="rvm1">
                        <p>Contenu à révéler</p>
                    </div>
                </div>
            </div>
        </section>
```

Deux composants dans la page

```apache
<section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>La mère de Jonathan a trois enfants. Le premier s’appelle Janvier. Le deuxième s’appelle Février.
                        Comment s’appelle le troisième?</p>
                    <label for="q1"><strong>Écrivez votre réponse ici:</strong></label>
                    <input type="text" name="q1" id="q1">

                    <button id="rvm1" class="btn btn-primary custom-btn-reveal btn-reveal reveal_1" type="submit"
                        data-reveal-more="reveal_1">Afficher la réponse</button>
                    <div class="custom-collapse reveal_1" data-revealme="reveal_1" aria-labelledby="rvm1">
                        <p>Contenu à révéler</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="revealMore">
            <div class="card-reveal">
                <div class="revealMore-body card-body" aria-live="polite">
                    <p>Avant la découverte de l’Everest, quel était le plus haut sommet du monde?</p>
                    <label for="q2"><strong>Écrivez votre réponse ici:</strong></label>
                    <input type="text" name="q2" id="q2">

                    <button id="rvm2" class="btn btn-primary custom-btn-reveal btn-reveal reveal_2" type="submit"
                        data-reveal-more="reveal_2">Afficher la réponse</button>
                    <div class="custom-collapse reveal_2" data-revealme="reveal_2" aria-labelledby="rvm2">
                        <p>Contenu à révéler</p>
                    </div>
                </div>
            </div>
        </section>
```

## CSS 3️⃣

The plugin has already styles prewritten, mostly to add media query support. That file is inside this folder.

You can still overwrite the styles in `~/scss/custom/theme/plugins/reveal-more/_reveal-more.scss`

Ideally use that file to fix the layout of complex content that will be revealed.

❗️❗️ **Remember to always follow the style guide**
