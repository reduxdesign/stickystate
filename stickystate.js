// Sticky State: A script to toggle the 'is-stuck' class on elements as they stick or unstick

// Using an Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function() {
  // Setup is initiated once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
      setupStickyState();
  });

  // This function sets up the sticky state for elements with the 'data-sticky-id' attribute
  function setupStickyState() {
    // Selecting all elements that are marked to be observed
    const stickyElements = document.querySelectorAll("[data-sticky-id]");
    
    // Configuration for the IntersectionObserver
    // Threshold set to 0 to trigger as soon as the element starts going out of view
    const observerOptions = {
      threshold: [0]
    };

    // Callback function for the IntersectionObserver
    // This function is called whenever the visibility of the target elements changes
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const stickyElement = document.querySelector(`[data-sticky-id="${entry.target.dataset.stickyId}"]`);

        // Handling the case where a sticky element is not found
        if (!stickyElement) {
          console.warn(`Sticky element with data-sticky-id="${entry.target.dataset.stickyId}" not found.`);
          return;
        }

        // Adding or removing the 'is-stuck' class based on the element's position
        if (!entry.isIntersecting) {
          stickyElement.classList.add("is-stuck");
        } else {
          stickyElement.classList.remove("is-stuck");
        }
      });
    };

    // Creating an instance of IntersectionObserver
    let observer;
    try {
      observer = new IntersectionObserver(observerCallback, observerOptions);
    } catch (e) {
      console.error("IntersectionObserver is not supported in this browser.", e);
      return;
    }

    // A set to keep track of used IDs to ensure uniqueness
    const usedIds = new Set();
    let autoIncrement = 0;

    // Processing each sticky element
    stickyElements.forEach((stickyElement) => {
      let stickyId = stickyElement.dataset.stickyId;

      // Generating a unique ID if the existing one is empty or a duplicate
      if (!stickyId || usedIds.has(stickyId)) {
        do {
          stickyId = `sticky-${autoIncrement++}`;
        } while (usedIds.has(stickyId));
      }

      // Assigning the unique ID and adding it to the set of used IDs
      stickyElement.dataset.stickyId = stickyId;
      usedIds.add(stickyId);

      // Observing each sticky element
      observer.observe(stickyElement);
    });
  }
})();
