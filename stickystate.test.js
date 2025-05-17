const setupStickyState = require('./stickystate.js');

let mockCallback;
let observedElement;

beforeEach(() => {
  mockCallback = undefined;
  observedElement = undefined;
  document.body.innerHTML = '<div id="wrapper"><div id="elem" class="sticky"></div></div>';
  global.IntersectionObserver = class {
    constructor(cb, options) {
      mockCallback = cb;
    }
    observe(el) {
      observedElement = el;
    }
    disconnect() {}
  };
});

afterEach(() => {
  document.body.innerHTML = '';
  delete global.IntersectionObserver;
});

test('inserts a sentinel before sticky element', () => {
  setupStickyState();
  const wrapper = document.getElementById('wrapper');
  const sentinel = wrapper.firstChild;
  const sticky = document.getElementById('elem');

  expect(sentinel).not.toBeNull();
  expect(sentinel.className).toBe('sticky-sentinel');
  expect(observedElement).toBe(sentinel);
  expect(sentinel.dataset.stickyId).toBe(sticky.dataset.stickyId);
});

test('toggles is-stuck class based on intersection', () => {
  setupStickyState();
  const sentinel = observedElement;
  const sticky = document.getElementById('elem');

  mockCallback([{ target: sentinel, isIntersecting: false }]);
  expect(sticky.classList.contains('is-stuck')).toBe(true);

  mockCallback([{ target: sentinel, isIntersecting: true }]);
  expect(sticky.classList.contains('is-stuck')).toBe(false);
});
