// IIFE - see http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife
;(function (win, doc, undefined) {
    // Declare some variable names we'll use.
    win.FlipWidget = function (options) {
        var flipWrapper,
            widgetHeading,
            backButton,
            flippedClass,
            enabledClass,
            disabledClass,
            flipElement,
            cardA,
            cardB,
            prefixes,
            defaultOpts,
            opts;

        // Quit early CSS 3D transforms and the classList API 
        // (as reported by Modernizr) are unsupported.
        if (!(Modernizr.csstransforms3d && Modernizr.classlist)) {
            return;
        }

        // Small helper function to extend objects - 
        // see https://gist.github.com/toddmotto/49c16d931a7380a1e661
        function extend (target, source) {
            var a = Object.create(target);
            Object.keys(source).map(function (prop) {
                prop in a && (a[prop] = source[prop]);
            });
            return a;
        }

        // Start with default options, but extend them based on the passed
        // in options object above and the extend function.
        defaultOpts = {
            wrapperSel: '.flip-wrapper',
            flipElementSel: '.flip-wrapper',
            widgetHeadingSel: '.menu-heading',
            backButtonSel: '.menu-save',
            flippedClass: 'is-flipped',
            enabledClass: 'flip-enabled',
            disabledClass: 'flip-disabled',
            sideASel: '.flip-a',
            sideBSel: '.flip-b',
            prefixes: ['webkit', 'MS', 'moz', '']
        };
        options = options || {};
        opts = extend(defaultOpts, options);

        // Initialize variables now that we now we're actually doing this.
        flipWrapper = doc.querySelector(opts.wrapperSel);
        widgetHeading = flipWrapper.querySelector(opts.widgetHeadingSel);
        flipElement = flipWrapper.querySelector(opts.flipElementSel) || flipWrapper;
        backButton = flipWrapper.querySelector(opts.backButtonSel);
        sideA = flipWrapper.querySelector(opts.sideASel);
        sideB = flipWrapper.querySelector(opts.sideBSel);

        // Create the "show filters" button
        var trigger = doc.createElement('button'),
            triggerText = doc.createTextNode('Show filters');
        trigger.appendChild(triggerText);
        // Give the trigger a class name.
        trigger.className += ' flip-trigger';
        // Add the trigger to the menu heading.
        widgetHeading.appendChild(trigger);

        // A small function to toggle the class name "is-flipped" when clicked:
        function toggleCard() {
            flipWrapper.classList.toggle(opts.flippedClass);
        }
        // Helper function to generate prefixed versions of the event handlers.
        function prefixedEvent(addOrRemove, prefixes, element, evt, callback) {
            var l = prefixes.length;

            // Loop over all the prefixes to support and run either
            // element.addEventListener or element.removeEventListener, based
            // on the value of the addOrRemove argument.
            for (var current=0; current<l; current++) {
                // set the event name to the lowercased standard version if no prefix.
                if (prefixes[current] === "") {
                    evt = evt.toLowerCase();
                }
                element[addOrRemove + 'EventListener'](prefixes[current]+evt, callback, false);
            }
        }
        // Helper function to switch classes using the classList API.
        function switchClass(el, cls1, cls2) {
            el.classList.remove(cls1);
            el.classList.add(cls2);
        }

        function hideSide(side) {
            switchClass(side, opts.enabledClass, opts.disabledClass);
            side.setAttribute('aria-hidden', 'true');
        }
        function showSide(side) {
            switchClass(side, opts.disabledClass, opts.enabledClass);
            side.setAttribute('aria-hidden', 'false');
        }

        // Function to completely hide A if B is displayed and vice versa
        // This is to make the widget keyboard accessible, so that it is not
        // possible to e.g. tab into the hidden part of the widget using
        // the keyboard.
        function handleDisplay(e) {

            var toShow, toHide, rAF;

            // A very crude "polyfill" for the requestAnimationFrame API -
            // see usage below.
            rAF = win.requestAnimationFrame || 
                  win.webkitRequestAnimationFrame || 
                  win.mozRequestAnimationFrame || 
                  function (callback) {return setTimeout(callback, 17);};

            if (flipWrapper.classList.contains(opts.flippedClass)) {
                toShow = sideA;
                toHide = sideB;
            } else {
                toShow = sideB;
                toHide = sideA;
            }
            showSide(toShow);

            // Stop the event from bubbling & stop it from submitting the form:
            if (e && 'preventDefault' in e) {
                //e.stopPropagation();
                e.preventDefault();
            }
            

            // After a transition on a side is done, stop listening to 
            // transitionend, and hide the side that was to be hidden.
            function removeTransitionListener(e) {
                // Return if not transitioning on the flipElement.
                if (e && e.target != flipElement) {
                    return;
                }
                hideSide(toHide);
                prefixedEvent('remove', opts.prefixes, flipElement, 'TransitionEnd', removeTransitionListener);
            }

            // Listen to the transition end event, and then hide the other.
            prefixedEvent('add', opts.prefixes, flipElement, 'TransitionEnd', removeTransitionListener);
            
            // Since we're setting the visibility property, we don't want to
            // run the toggle animation in the same frame. Thus, we're using
            // the requestAnimationFrame API to wait until the next available
            // animation frame, when DOM operations are done.
            rAF(function () {
                toggleCard();
                // When going back to side A, focus the trigger button again.
                if (e.target == backButton) {
                    // This is a very hacky solution, but some browsers don't
                    // seem to respect setting the focus to an element mid-transition.
                    // Therefore we wait until well after the transition to move
                    // keyboard focus to the button.
                    setTimeout(function () {
                        trigger.focus();
                    }, 300);
                }
            });
            
            
        }
        // Run the setup once to set the initial states:
        hideSide(sideB);
        // Hook up the buttons to the event handler:
        trigger.addEventListener('click', handleDisplay);
        backButton.addEventListener('click', handleDisplay);
    };
    
// Note on the pattern below: this self-invoking function is called with
// the window and document host objects as arguments.
}(window, document));