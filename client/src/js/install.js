const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome from showing the default prompt.
    //event.preventDefault();

    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;

    // Update UI notify the user they can install the PWA
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the prompt
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    promptEvent.prompt();

    // We no longer need the deferredPrompt. Clear it up.
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
    window.deferredPrompt = null;
});
