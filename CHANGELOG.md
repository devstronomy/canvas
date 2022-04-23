# Changelog

## [0.3.1] - 2022-04-23

- API for setting zoom boundaries.

## [0.3.0] - 2022-04-23

- Started to track this CHANGELOG.
- Initial implementation of debug box (#3)
  - Show only canvas width and height.
  - API on CanvasInfo to show/hide the box.
  - Transparent.
- Initial zooming support
  - Built into the canvas library. So it does not need to be handled by clients for now.
  - To be more customizable as needed (e.g., zoom boundaries, color).
  - Show zoom level in the debug box.
  - Rather tailored for Devstronomy now.
