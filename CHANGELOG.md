# Changelog

## [0.4.0] - ????-??-??

- Remove `CanvasInfo#canvas`. Use `width` and `height` from `CanvasInfo` instead.
- Draw boundary box for the demo scenes. To better track the zoom level.
- Track mouse position in the debug box.
- Fix canvas clean-up glitch.

## [0.3.1] - 2022-04-23

- API for setting zoom boundaries.

## [0.3.0] - 2022-04-23

- Initial zooming support
  - Built into the canvas library. So it does not need to be handled by clients for now.
  - To be more customizable as needed (e.g., zoom boundaries, color).
  - Show zoom level in the debug box.
  - Rather tailored for Devstronomy now.
- Initial implementation of debug box (#3)
  - Show only canvas width and height.
  - API on CanvasInfo to show/hide the box.
  - Transparent.
- Started to track this CHANGELOG.
