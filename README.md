# StickyState

StickyState is a lightweight JavaScript utility that adds a class to sticky elements when they scroll out of view. It relies on `IntersectionObserver` to detect when a placeholder sentinel leaves the viewport and toggles an `is-stuck` class on the corresponding element.

## Installation

```bash
npm install stickystate
```

## Usage

1. Add the `sticky` class to any element you want to monitor.
2. Include `stickystate.js` on the page and call `setupStickyState()`.

```html
<div class="header sticky">I stick when scrolled</div>
<script src="stickystate.js"></script>
<script>
  // initialize after DOM is ready
  setupStickyState();
</script>
```

The script will insert an invisible sentinel before each sticky element. When the sentinel leaves the viewport, the corresponding element receives an `is-stuck` class so you can style it appropriately.

## Development

This project uses [Jest](https://jestjs.io/) for unit tests. Run tests with:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
