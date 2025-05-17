// Sticky State: A JavaScript utility for toggling a class on sticky elements based on scroll position.

(function() {
  // If the DOM is already parsed, initialize immediately. Otherwise, wait for DOMContentLoaded.
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setupStickyState();
  } else {
      document.addEventListener('DOMContentLoaded', function() {
          setupStickyState();
      });
  }

  // Function to setup the sticky state for elements.
  function setupStickyState() {
    // Select all elements that are intended to be sticky.
    const stickyElements = document.querySelectorAll(".sticky");

    // Options for the IntersectionObserver. A threshold of 0
    // fires the callback when the sentinel enters or leaves the
    // viewport.
    const observerOptions = {
      threshold: [0] // Fires when the sentinel enters or leaves the viewport.
    };

    // Callback function for the IntersectionObserver.
    // This function will be called each time the visibility of the observed element changes.
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Using the dataset of the sentinel to find the associated sticky element.
        const stickyElement = document.querySelector(`.sticky[data-sticky-id="${entry.target.dataset.stickyId}"]`);

        // Warning if the associated sticky element is not found.
        if (!stickyElement) {
          console.warn(`Sticky element with data-sticky-id="${entry.target.dataset.stickyId}" not found.`);
          return;
        }

        // Toggling the 'is-stuck' class based on whether the element is intersecting.
        if (!entry.isIntersecting) {
          stickyElement.classList.add("is-stuck");
        } else {
          stickyElement.classList.remove("is-stuck");
        }
      });
    };

    // Creating an IntersectionObserver instance with the specified callback and options.
    let observer;
    try {
      observer = new IntersectionObserver(observerCallback, observerOptions);
    } catch (e) {
      // Error handling for browsers that do not support IntersectionObserver.
      console.error("IntersectionObserver is not supported in this browser.", e);
      return;
    }

    // Assigning unique identifiers and creating sentinel elements for each sticky element.
    stickyElements.forEach((stickyElement, index) => {
      // Assign a unique identifier to each sticky element.
      const stickyId = `sticky-${index}`;
      stickyElement.dataset.stickyId = stickyId;

      // Creating a sentinel element to observe.
      const sentinel = document.createElement("div");
      sentinel.className = 'sticky-sentinel';
      sentinel.dataset.stickyId = stickyId;
      // Give the sentinel a minimal size so IntersectionObserver
      // correctly detects when it scrolls out of view without
      // affecting layout.
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0';
      sentinel.style.left = '0';
      sentinel.style.width = '1px';
      sentinel.style.height = '1px';
      sentinel.style.pointerEvents = 'none';
      sentinel.style.visibility = 'hidden';

      // Placing the sentinel in the DOM before the sticky element.
      stickyElement.parentNode.insertBefore(sentinel, stickyElement);

      // Start observing the sentinel.
      observer.observe(sentinel);
    });
  }
})();
